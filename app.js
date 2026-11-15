'use strict';

const icons = {
  home: '<path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2z"/>',
  gear: '<path d="M10 3h4l.6 2.5 1.6.9 2.5-.7 2 3.5-1.8 1.8v2l1.8 1.8-2 3.5-2.5-.7-1.6.9L14 21h-4l-.6-2.5-1.6-.9-2.5.7-2-3.5L5 13v-2L3.3 9.2l2-3.5 2.5.7 1.6-.9z"/><circle cx="12" cy="12" r="3"/>',
  lambda: '<path d="M6 4h1.3a3 3 0 0 1 2.8 1.8l5.8 12.4a3 3 0 0 0 2.8 1.8H20M11.8 9.5 5.5 20"/>',
  library: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8m-8 4h8m-8 4h5"/>',
  folder: '<path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  search: '<circle cx="10.8" cy="10.8" r="6.3"/><path d="m16 16 4 4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
  'arrow-up': '<path d="M6 18 18 6M7 6h11v11"/>',
  variant: '<circle cx="6" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="7" r="2"/><path d="M6 7v10m0-2c2 0 6 0 9-4l2-2"/>',
  file: '<path d="M13 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10z"/><path d="M13 3v7h7M8 14h8m-8 3h5"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>'
};
const icon = name => '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">' + icons[name] + '</svg>';
const escapeText = value => String(value ?? '').replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[char]);

const courses = {
  engineering: { name: 'Engineering Mathematics', description: 'Explore differential equations, Laplace transforms, and other engineering mathematics topics.' },
  linear: { name: 'Linear Algebra', description: 'Explore matrices, vector spaces, eigenvalues, and other linear algebra topics.' }
};
const pages = {
  home: { name: 'Home', description: 'Practice engineering mathematics and linear algebra in one place.' },
  ...courses,
  library: { name: 'Problem Bank', description: 'Browse original problems and practice variants from both courses.' },
  sets: { name: 'Problem Sets', description: 'Browse problems grouped by course handout, or create a set of your own.' }
};

const storageKey = 'math-studio.problems.v1';
const setStorageKey = 'math-studio.sets.v1';
const examples = window.mathStudioExamples;
const handoutSets = window.mathStudioHandoutSets;
const levelLabels = {
  '\uAE30\uCD08': 'Beginner',
  '\uC911\uAE09': 'Intermediate',
  '\uC2EC\uD654': 'Advanced'
};
const byId = id => document.getElementById(id);
const shell = document.querySelector('.shell');
const mainShell = document.querySelector('.main-shell');
const mobile = matchMedia('(max-width: 760px)');
const search = byId('problem-search');
const unitFilter = byId('unit-filter');
const detail = byId('detail');
const editor = byId('editor');
const form = byId('problem-form');
const fields = form.elements;
const setEditor = byId('set-editor');
const setForm = byId('set-form');
const setEntries = byId('set-entries');
const state = { page: 'home', setId: null, kind: 'all', unit: '', query: '', openedId: null };
let records = readRecords();
let savedSets = readSavedSets();
let detailTrigger = null;
let editorTrigger = null;
let editorContext;
let searchOnNavigate = false;
let feedbackTimeout;

function readRecords() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
    if (!Array.isArray(saved)) return [];
    return saved
      .filter(item => item && typeof item.id === 'string' && Object.hasOwn(courses, item.course))
      .map(item => ({ ...item, level: Object.hasOwn(levelLabels, item.level) ? levelLabels[item.level] : item.level }));
  } catch {
    return [];
  }
}

function allProblems() {
  return [...records.filter(problem => !problem.setId), ...allSets().flatMap(set => set.problems), ...examples];
}

function pageProblems() {
  if (state.setId) return allSets().find(set => set.id === state.setId)?.problems ?? [];
  return allProblems().filter(problem => !Object.hasOwn(courses, state.page) || problem.course === state.page);
}

function readSavedSets() {
  try {
    const saved = JSON.parse(localStorage.getItem(setStorageKey) ?? '[]');
    return Array.isArray(saved) ? saved.filter(set => set && typeof set.id === 'string' &&
      Object.hasOwn(courses, set.course) && Array.isArray(set.problems)) : [];
  } catch {
    return [];
  }
}

function allSets(problemRecords = records, customSets = savedSets) {
  return [...handoutSets, ...customSets].map(set => {
    // IDs let browser edits replace bundled or previously saved problems in place.
    const changes = new Map(problemRecords.filter(problem => problem.setId === set.id)
      .map(problem => [problem.id, problem]));
    if (!changes.size) return set;
    const problems = set.problems.map(problem => {
      const updated = changes.get(problem.id);
      changes.delete(problem.id);
      return updated ? { ...problem, ...updated } : problem;
    });
    return { ...set, problems: [...problems, ...[...changes.values()].reverse()] };
  });
}

function unitNames(problems) {
  return [...new Set(problems.map(problem => problem.unit))].sort((a, b) => a.localeCompare(b, 'en'));
}

function problemCount(count) {
  return count + (count === 1 ? ' problem' : ' problems');
}

function setRoute(moveFocus = false) {
  const [route, filter] = location.hash.slice(1).split('/');
  if (route === 'content') return;
  state.page = Object.hasOwn(pages, route) ? route : 'home';
  state.setId = state.page === 'sets' ? allSets().find(set => set.id === filter)?.id ?? null : null;
  state.kind = state.page === 'library' && filter === 'variants' ? 'variant' : 'all';
  state.unit = '';
  state.query = '';
  search.value = '';
  setNavigation(false, false);
  renderPage();
  window.scrollTo(0, 0);

  if (searchOnNavigate) {
    searchOnNavigate = false;
    search.focus();
  } else if (moveFocus) {
    byId('content').focus({ preventScroll: true });
  }
}

function renderPage() {
  const page = pages[state.page];
  const isHome = state.page === 'home';
  const isSetsPage = state.page === 'sets';
  const selectedSet = allSets().find(set => set.id === state.setId);
  const isSetIndex = isSetsPage && !selectedSet;
  byId('breadcrumb').textContent = page.name;
  byId('page-title').textContent = selectedSet?.title ?? page.name;
  byId('page-description').textContent = selectedSet
    ? [courses[selectedSet.course].name, selectedSet.section && 'Section ' + selectedSet.section, selectedSet.reference].filter(Boolean).join(' · ')
    : page.description;
  document.title = (selectedSet?.title ?? page.name) + ' · Math Studio';
  byId('hero').hidden = !isHome;
  byId('overview').hidden = !isHome;
  byId('all-link').hidden = !isHome;
  byId('back-to-sets').hidden = !selectedSet;
  byId('problem-section').hidden = isSetIndex;
  byId('type-filter').hidden = Boolean(selectedSet);
  unitFilter.hidden = Boolean(selectedSet);
  byId('add-set').hidden = !isSetIndex;
  byId('add-problem').hidden = isSetIndex;
  renderSets(isHome, isSetIndex);

  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.dataset.page === state.page) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  const problems = allProblems();
  byId('engineering-count').textContent = problemCount(problems.filter(problem => problem.course === 'engineering').length);
  byId('linear-count').textContent = problemCount(problems.filter(problem => problem.course === 'linear').length);
  byId('variant-count').textContent = problemCount(problems.filter(problem => problem.kind === 'variant').length);

  const available = pageProblems();
  const registered = available.filter(problem => !problem.sample).length;
  byId('list-description').textContent = selectedSet
    ? problemCount(available.length) + ' in this set'
    : registered
      ? registered + ' added · ' + (available.length - registered) + ' samples'
      : 'Explore the sample problems or add one from your course notes.';

  unitFilter.replaceChildren(new Option('All topics', ''), ...unitNames(available).map(unit => new Option(unit, unit)));
  if (![...unitFilter.options].some(option => option.value === state.unit)) state.unit = '';
  unitFilter.value = state.unit;
  renderList();
}

function renderSets(isHome, isSetIndex) {
  const courseId = Object.hasOwn(courses, state.page) ? state.page : null;
  const sets = allSets().filter(set => !courseId || set.course === courseId);
  const visibleSets = isHome ? sets.slice(0, 3) : sets;
  const showSets = isHome || isSetIndex || (courseId && sets.length > 0);
  byId('sets-section').hidden = !showSets;
  byId('sets-heading-row').hidden = isSetIndex;
  if (!showSets) return;
  byId('set-list').innerHTML = visibleSets.map(set => {
    const label = set.section ? 'Section ' + set.section : courses[set.course].name;
    return '<li><a class="set-card" href="#sets/' + encodeURIComponent(set.id) + '">' +
      '<span class="set-card-meta"><span class="metric-icon violet">' + icon('folder') + '</span>' + escapeText(label) + '</span>' +
      '<strong>' + escapeText(set.title) + '</strong><span class="set-card-count">' + problemCount(set.problems.length) +
      icon('arrow') + '</span></a></li>';
  }).join('');
}

function kindTag(kind) {
  return kind === 'variant' ? '<span class="kind variant">Variant</span>' : '<span class="kind">Original</span>';
}

function renderList() {
  document.querySelectorAll('[data-kind]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.kind === state.kind));
  });
  const query = state.query.toLocaleLowerCase('en').trim();
  const available = pageProblems();
  const filtered = available.filter(problem =>
    (state.kind === 'all' || problem.kind === state.kind) &&
    (!state.unit || problem.unit === state.unit) &&
    [problem.title, problem.unit, problem.source, courses[problem.course].name]
      .some(value => String(value ?? '').toLocaleLowerCase('en').includes(query))
  );

  byId('problems').innerHTML = filtered.map(problem => {
    const title = escapeText(problem.title);
    const sample = problem.sample ? '<small>Sample</small>' : '';
    const courseAndUnit = [courses[problem.course].name, problem.unit].map(escapeText).join(' · ');
    return '<li><button type="button" class="problem-row" data-problem="' + escapeText(problem.id) + '">' +
      '<span class="row-title"><span>' + icon(problem.kind === 'variant' ? 'variant' : 'file') +
      '</span><span><strong>' + title + '</strong>' + sample + '</span></span>' +
      '<span class="row-unit">' + courseAndUnit + '</span><span class="row-kind">' + kindTag(problem.kind) +
      '</span><span class="row-level">' + escapeText(problem.level ?? '—') + '</span><span class="row-arrow">' + icon('chevron') +
      '</span></button></li>';
  }).join('');

  byId('result-count').textContent = 'Showing ' + filtered.length + ' of ' + problemCount(available.length);
  byId('empty').hidden = filtered.length > 0;
  if (filtered.length === 0) {
    const hasProblems = available.length > 0;
    byId('empty-title').textContent = hasProblems ? 'No matching problems' : 'No problems yet';
    byId('empty-text').textContent = hasProblems ? 'Try a different search or change the filters.' : 'Add your first problem to get started.';
    const action = byId('empty-action');
    action.textContent = hasProblems ? 'Reset Filters' : 'Add Problem';
    action.dataset.action = hasProblems ? 'reset-filters' : 'create';
  }
}

function setKind(kind) {
  state.kind = kind;
  if (state.page === 'library') {
    history.replaceState(null, '', kind === 'variant' ? '#library/variants' : '#library');
  }
  renderList();
}

function relatedList(title, problems) {
  if (!problems.length) return '';
  return '<section class="related"><h3>' + title + '</h3><ul class="related-list">' +
    problems.map(problem => '<li><button type="button" class="related-button" data-problem="' + escapeText(problem.id) +
      '"><span>' + escapeText(problem.title) + '</span>' + icon('chevron') + '</button></li>').join('') + '</ul></section>';
}

function formatStatementMath(text) {
  const notation = /\^\(([^()\n]+)\)|\^(\d+|[A-Za-z])|\[\[[\d\s,.[\]+−-]+\]\]/g;
  let result = '';
  let offset = 0;
  for (const match of text.matchAll(notation)) {
    result += escapeText(text.slice(offset, match.index));
    offset = match.index + match[0].length;
    const [, exponent, power] = match;
    if (exponent || power) {
      result += '<sup>' + escapeText(exponent ?? power) + '</sup>';
      continue;
    }

    const rows = match[0].slice(2, -2).split(/\]\s*,\s*\[/).map(row => row.split(',').map(cell => cell.trim()));
    const isMatrix = rows.every(row => row.length === rows[0].length &&
      row.every(cell => /^[+−-]?\d+(?:\.\d+)?$/.test(cell)));
    if (!isMatrix) {
      result += escapeText(match[0]);
      continue;
    }
    result += '<span class="statement-matrix" role="img" aria-label="Matrix with rows ' +
      escapeText(rows.map(row => row.join(', ')).join(' / ')) + '"><span class="matrix-cells">' +
      rows.map(row => '<span class="matrix-row">' +
        row.map(cell => '<span>' + escapeText(cell) + '</span>').join('') + '</span>').join('') +
      '</span></span>';
  }
  return result + escapeText(text.slice(offset));
}

function isEquationLine(line) {
  const mathWords = /^(?:sin|cos|tan|sinh|cosh|ln|exp|arctan|span|det|Ax|Re)$/;
  const words = line.match(/[A-Za-z]{2,}/g) ?? [];
  return /[=′″‴^²³⁴⁽∈≥≤]/.test(line) && words.every(word => mathWords.test(word));
}

function renderStatement(statement) {
  const blocks = [];
  for (const paragraph of String(statement ?? '').trim().split(/\r?\n[ \t]*\r?\n/)) {
    const lines = paragraph.split(/\r?\n/).map(value => value.trim()).filter(Boolean);
    for (const [index, line] of lines.entries()) {
      if (isEquationLine(line)) {
        blocks.push({ equation: true, text: line });
        continue;
      }
      const inline = line.match(/^(.+?\s)((?:y[′″‴]|f\(t\))\s*=.+)$/);
      if (inline && isEquationLine(inline[2])) {
        blocks.push({ equation: false, text: inline[1].trim() }, { equation: true, text: inline[2] });
        continue;
      }
      blocks.push({ equation: false, continuation: index > 0, text: line });
    }
  }
  const contents = blocks.map(({ equation, continuation, text }) =>
    '<p class="' + (equation ? 'statement-equation' : 'statement-line') +
    (continuation ? ' statement-continuation' : '') + '">' +
    '<span>' + formatStatementMath(text) + '</span></p>'
  ).join('');
  return '<div class="problem-text">' + contents + '</div>';
}

function renderProblemContent(source, legacy, className) {
  if (!/\\[()[\]]/.test(source)) return legacy(source);
  const { html } = window.mathStudioMath.render(source);
  return '<div class="' + className + ' math-copy">' + html + '</div>';
}

function showProblem(id, trigger) {
  const problems = allProblems();
  const problem = problems.find(entry => entry.id === id);
  if (!problem) return;
  state.openedId = id;
  if (!detail.open && trigger) detailTrigger = trigger;

  const parent = problem.parentId && problems.find(entry => entry.id === problem.parentId);
  const variants = problems.filter(entry => entry.parentId === id);
  const source = problem.source ? '<p class="source">Course notes reference · ' + escapeText(problem.source) + '</p>' : '';
  const solution = problem.solution ? '<details class="solution"><summary>Show answer and solution</summary>' +
    renderProblemContent(problem.solution, value => '<div class="solution-text">' + escapeText(value) + '</div>', 'solution-text') +
    '</details>' : '';

  byId('detail-body').innerHTML = '<div class="detail-meta">' + kindTag(problem.kind) +
    '<span>' + [courses[problem.course].name, problem.unit, problem.level].filter(Boolean).map(escapeText).join(' · ') +
    (problem.sample ? ' · Sample' : '') + '</span></div><h2 id="detail-title" tabindex="-1">' + escapeText(problem.title) +
    '</h2>' + renderProblemContent(problem.statement ?? '', renderStatement, 'problem-text math-statement') + source + solution +
    relatedList('Linked original problem', parent ? [parent] : []) + relatedList('Linked practice variants', variants);

  const actions = [
    problem.sample ? '' : '<button type="button" class="button secondary" data-action="edit">Edit</button>',
    problem.kind === 'original' ? '<button type="button" class="button primary" data-action="create-variant">' + icon('plus') + ' Add Variant</button>' : ''
  ];
  byId('detail-actions').innerHTML = actions.join('');
  byId('detail-actions').hidden = actions.every(action => !action);
  if (!detail.open) detail.showModal();
  window.mathStudioMath.fit(detail);
  byId('detail-body').scrollTop = 0;
  byId('detail-title').focus();
}

function updateEditorOptions(preferredParent) {
  const courseProblems = allProblems().filter(problem => problem.course === fields.course.value);
  const needsParent = fields.kind.value === 'variant';
  const originals = courseProblems.filter(problem => problem.kind === 'original');
  const initialParent = preferredParent ?? fields.parentId.value;
  const hasParent = originals.some(problem => problem.id === initialParent);

  byId('parent-field').hidden = !needsParent;
  fields.parentId.disabled = !needsParent || !originals.length;
  fields.parentId.required = needsParent;
  fields.parentId.replaceChildren(
    new Option('Select an original problem', ''),
    ...originals.map(problem => new Option(problem.title + (problem.sample ? ' (Sample)' : ''), problem.id))
  );
  fields.parentId.value = hasParent ? initialParent : '';
  byId('parent-hint').textContent = originals.length ? '' : 'Add an original problem to this course first.';
  byId('save-problem').disabled = needsParent && !originals.length;
  byId('known-units').replaceChildren(...unitNames(courseProblems).map(unit => {
    const option = document.createElement('option');
    option.value = unit;
    return option;
  }));
}

const mathTemplates = {
  inline: '\\(x\\)',
  equation: '\\[\ny = x\n\\]',
  fraction: '\\(\\frac{a}{b}\\)',
  power: '\\(x^{2}\\)',
  root: '\\(\\sqrt{x}\\)',
  matrix: '\\[\n\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}\n\\]',
  integral: '\\[\n\\int_{a}^{b} f(x)\\,dx\n\\]'
};

function updateMathEditor(textarea) {
  const tools = textarea.closest('label').nextElementSibling;
  const preview = tools.querySelector('.math-preview');
  const content = tools.querySelector('.math-preview-content');
  const error = tools.querySelector('.math-error');
  const value = textarea.value.trim();
  preview.hidden = !value;
  const rendered = window.mathStudioMath.render(value);
  content.innerHTML = rendered.html
    ? '<div class="problem-text math-copy math-statement">' + rendered.html + '</div>'
    : '';
  error.textContent = rendered.error;
  error.hidden = !rendered.error;
  textarea.setAttribute('aria-invalid', String(Boolean(rendered.error)));
  window.mathStudioMath.fit(preview);
  return !rendered.error;
}

function updateMathEditors(scope) {
  scope.querySelectorAll('[data-math-editor]').forEach(updateMathEditor);
}

function validateMathEditors(scope) {
  const invalid = [...scope.querySelectorAll('[data-math-editor]')].find(field => !updateMathEditor(field));
  if (invalid) invalid.focus();
  return !invalid;
}

function attachMathEditors(scope) {
  for (const textarea of scope.querySelectorAll('[data-math-editor]')) {
    const tools = byId('math-editor-template').content.firstElementChild.cloneNode(true);
    textarea.closest('label').after(tools);
    const insert = type => {
      const snippet = mathTemplates[type];
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selected = textarea.value.slice(start, end);
      const hasSelection = selected && (type === 'inline' || type === 'equation');
      const formula = hasSelection ? snippet.slice(0, 2) + selected + snippet.slice(-2) : snippet;
      const display = formula.startsWith('\\[');
      const prefix = display && start && textarea.value[start - 1] !== '\n' ? '\n' : '';
      const suffix = display && end < textarea.value.length && textarea.value[end] !== '\n' ? '\n' : '';
      const replacement = prefix + formula + suffix;
      if (textarea.value.length - (end - start) + replacement.length > textarea.maxLength) return;
      textarea.setRangeText(replacement, start, end, 'end');
      textarea.focus();
      const formulaStart = start + prefix.length;
      textarea.setSelectionRange(formulaStart + 2, formulaStart + formula.length - 2);
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
    };
    tools.querySelectorAll('[data-math-insert]').forEach(button => {
      button.addEventListener('click', () => insert(button.dataset.mathInsert));
    });
    const templates = tools.querySelector('[data-math-template]');
    templates.addEventListener('change', () => {
      if (templates.value) insert(templates.value);
      templates.value = '';
    });
    // Coalesce typing into one preview update per frame.
    let frame;
    textarea.addEventListener('input', () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => updateMathEditor(textarea));
    });
  }
}

function openEditor(trigger, { existing, parent, setId = existing?.setId } = {}) {
  const set = allSets().find(item => item.id === setId);
  if (setId && !set) return;
  editorTrigger = trigger;
  editorContext = { existing, setId };
  form.reset();
  byId('form-error').hidden = true;
  byId('editor-title').textContent = existing ? 'Edit Problem' : parent ? 'Add Variant' : 'Add Problem';
  byId('save-problem').textContent = existing ? 'Save Changes' : 'Add Problem';
  byId('problem-editor-note').textContent = set
    ? 'Problem set: ' + set.title + '. Changes are saved in this browser.'
    : 'Changes are saved in this browser.';

  const course = set?.course ?? existing?.course ?? parent?.course ??
    (Object.hasOwn(courses, state.page) ? state.page : 'engineering');
  fields.course.value = course;
  fields.kind.value = existing?.kind ?? (!set && (parent || state.kind === 'variant') ? 'variant' : 'original');
  fields.course.disabled = Boolean(existing || set);
  fields.kind.disabled = Boolean(existing || set);
  fields.unit.value = existing?.unit ?? set?.title ?? parent?.unit ?? state.unit;
  fields.unit.disabled = Boolean(set);
  fields.level.value = existing ? existing.level ?? '' : parent?.level ?? 'Beginner';
  fields.title.value = existing?.title ?? '';
  fields.statement.value = existing?.statement ?? '';
  fields.source.value = existing?.source ?? '';
  fields.solution.value = existing?.solution ?? '';
  updateEditorOptions(existing?.parentId ?? parent?.id);
  editor.showModal();
  updateMathEditors(form);
  fields.title.focus();
}

function formError(message, field) {
  const error = byId('form-error');
  error.textContent = message;
  error.hidden = false;
  if (field) field.focus();
}

function saveProblem(event) {
  event.preventDefault();
  const read = name => fields[name].value.trim();
  if (!read('unit')) return formError('Enter a topic.', fields.unit);
  if (!read('title')) return formError('Enter a title.', fields.title);
  if (!read('statement')) return formError('Enter a problem statement.', fields.statement);
  if (!validateMathEditors(form)) return;

  const { existing, setId } = editorContext;
  const editing = existing?.id;
  const latest = readRecords();
  const latestSets = allSets(latest, readSavedSets());
  const set = latestSets.find(item => item.id === setId);
  if (setId && !set) return formError('This problem set is no longer available.');
  if (editing) {
    const current = (set ? set.problems : latest).find(problem => problem.id === editing);
    if (JSON.stringify(current) !== JSON.stringify(existing)) {
      return formError('This problem changed while you were editing. Close the editor and open it again.');
    }
  }
  const course = read('course');
  const kind = read('kind');
  const parentId = kind === 'variant' ? read('parentId') : '';
  if (kind === 'variant' && ![...latest.filter(problem => !problem.setId), ...latestSets.flatMap(set => set.problems), ...examples].some(problem =>
    problem.kind === 'original' && problem.id === parentId && problem.course === course
  )) return formError('Select an original problem from the same course.', fields.parentId);

  const id = editing ?? uniqueId();
  const problem = {
    id, course, kind, parentId,
    unit: read('unit'), level: read('level'), title: read('title'),
    statement: read('statement'), source: read('source'), solution: read('solution')
  };
  if (setId) problem.setId = setId;
  const updated = setId && latest.some(item => item.id === id)
    ? latest.map(item => item.id === id ? problem : item)
    : [problem, ...latest.filter(item => item.id !== id)];
  try {
    localStorage.setItem(storageKey, JSON.stringify(updated));
  } catch {
    formError('Unable to save in this browser. Check your storage or browser settings and try again.');
    return;
  }
  records = updated;
  editor.close('saved');
  renderPage();
  showProblem(id, byId('problems').querySelector('[data-problem="' + CSS.escape(id) + '"]') ?? editorTrigger);
  announce(editing ? 'Changes saved.' : 'Problem added.');
}

function uniqueId() {
  return crypto.randomUUID?.() ?? 'local-' + crypto.getRandomValues(new Uint32Array(4)).join('-');
}

function numberSetEntries() {
  const entries = [...setEntries.children];
  entries.forEach((entry, index) => {
    const label = 'Problem ' + (index + 1);
    entry.querySelector('legend').textContent = label;
    const remove = entry.querySelector('.remove-set-entry');
    remove.hidden = entries.length === 1;
    remove.setAttribute('aria-label', 'Remove ' + label.toLowerCase());
  });
}

function addSetEntry(focus = true) {
  const entry = byId('set-entry-template').content.firstElementChild.cloneNode(true);
  setEntries.append(entry);
  attachMathEditors(entry);
  numberSetEntries();
  if (focus) entry.querySelector('input').focus();
}

function openSetEditor() {
  setForm.reset();
  byId('set-form-error').hidden = true;
  setEntries.replaceChildren();
  addSetEntry(false);
  setEditor.showModal();
  setForm.elements.title.focus();
}

function setFormError(message, field) {
  const error = byId('set-form-error');
  error.textContent = message;
  error.hidden = false;
  if (field) field.focus();
}

function saveSet(event) {
  event.preventDefault();
  const { title: titleField, course: courseField, reference: referenceField } = setForm.elements;
  const title = titleField.value.trim();
  if (!title) return setFormError('Enter a set title.', titleField);
  if (!validateMathEditors(setForm)) return;

  const id = uniqueId();
  const course = courseField.value;
  const reference = referenceField.value.trim();
  const problems = [];
  for (const [index, entry] of [...setEntries.children].entries()) {
    const problemTitle = entry.querySelector('[name="problemTitle"]');
    const statement = entry.querySelector('[name="problemStatement"]');
    const problemReference = entry.querySelector('[name="problemReference"]').value.trim();
    if (!problemTitle.value.trim()) return setFormError('Enter a title for problem ' + (index + 1) + '.', problemTitle);
    if (!statement.value.trim()) return setFormError('Enter a statement for problem ' + (index + 1) + '.', statement);
    problems.push({
      id: id + '-' + (index + 1), setId: id, course, kind: 'original', unit: title,
      title: problemTitle.value.trim(), statement: statement.value.trim(),
      source: [reference, problemReference].filter(Boolean).join(' · ')
    });
  }
  const updated = [{ id, title, course, reference, problems }, ...readSavedSets()];
  try {
    localStorage.setItem(setStorageKey, JSON.stringify(updated));
  } catch {
    return setFormError('Unable to save in this browser. Check your storage or browser settings and try again.');
  }
  savedSets = updated;
  setEditor.close();
  location.hash = 'sets/' + id;
  announce('Problem set added.');
}

function announce(message) {
  const toast = byId('toast');
  clearTimeout(feedbackTimeout);
  toast.textContent = message;
  feedbackTimeout = setTimeout(() => { toast.textContent = ''; }, 3200);
}

function openSearch() {
  if (state.page === 'library') {
    search.focus();
    search.select();
  } else {
    searchOnNavigate = true;
    location.hash = 'library';
  }
}

function setNavigation(open, restoreFocus = true) {
  const isOpen = open && mobile.matches;
  const wasOpen = shell.classList.contains('nav-open');
  shell.classList.toggle('nav-open', isOpen);
  document.querySelector('.scrim').hidden = !isOpen;
  const menu = document.querySelector('.menu-toggle');
  menu.setAttribute('aria-expanded', String(isOpen));
  mainShell.inert = isOpen;
  byId('sidebar').inert = mobile.matches && !isOpen;
  if (isOpen) document.querySelector('.sidebar-close').focus();
  else if (wasOpen && restoreFocus && mobile.matches) menu.focus();
}

document.querySelectorAll('[data-icon]').forEach(element => { element.innerHTML = icon(element.dataset.icon); });
byId('shortcut').textContent = /Mac/.test(navigator.platform) ? '⌘ K' : 'Ctrl K';
document.addEventListener('click', event => {
  const target = event.target.closest('button, a');
  if (!target) return;
  if (target.dataset.problem) {
    showProblem(target.dataset.problem, target);
    return;
  }
  if (target.dataset.kind) {
    setKind(target.dataset.kind);
    return;
  }
  if (target.matches('.sidebar a[href]') && target.hash === location.hash) setNavigation(false);

  const opened = allProblems().find(problem => problem.id === state.openedId);
  switch (target.dataset.action) {
    case 'create': openEditor(target, { setId: state.setId }); break;
    case 'create-set': openSetEditor(); break;
    case 'add-set-entry': addSetEntry(); break;
    case 'remove-set-entry': {
      if (setEntries.children.length < 2) break;
      const entry = target.closest('fieldset');
      const next = entry.nextElementSibling ?? entry.previousElementSibling;
      entry.remove();
      numberSetEntries();
      next.querySelector('input').focus();
      break;
    }
    case 'create-variant': if (opened) openEditor(target, { parent: opened }); break;
    case 'edit': if (opened) openEditor(target, { existing: opened }); break;
    case 'close-dialog': target.closest('dialog').close('dismissed'); break;
    case 'search': openSearch(); break;
    case 'open-nav': setNavigation(true); break;
    case 'close-nav': setNavigation(false); break;
    case 'reset-filters':
      state.query = '';
      state.unit = '';
      search.value = '';
      unitFilter.value = '';
      setKind('all');
      search.focus();
      break;
  }
});

search.addEventListener('input', () => {
  state.query = search.value;
  renderList();
});
unitFilter.addEventListener('change', () => {
  state.unit = unitFilter.value;
  renderList();
});
fields.course.addEventListener('change', () => updateEditorOptions(''));
fields.kind.addEventListener('change', () => updateEditorOptions());
fields.parentId.addEventListener('change', () => {
  const parent = allProblems().find(problem => problem.id === fields.parentId.value);
  if (parent && !fields.unit.value.trim()) fields.unit.value = parent.unit;
});
form.addEventListener('submit', saveProblem);
form.addEventListener('input', () => { byId('form-error').hidden = true; });
setForm.addEventListener('submit', saveSet);
setForm.addEventListener('input', () => { byId('set-form-error').hidden = true; });
attachMathEditors(form);
const fitOpenMath = () => {
  for (const dialog of [detail, editor, setEditor]) {
    if (dialog.open) window.mathStudioMath.fit(dialog);
  }
};
window.addEventListener('resize', fitOpenMath);
document.fonts?.addEventListener('loadingdone', fitOpenMath);
detail.addEventListener('toggle', event => {
  if (event.target.matches('.solution[open]')) window.mathStudioMath.fit(detail);
}, true);
detail.addEventListener('close', () => {
  state.openedId = null;
  if (detailTrigger?.isConnected) detailTrigger.focus();
  else byId('content').focus({ preventScroll: true });
  detailTrigger = null;
});
editor.addEventListener('close', () => {
  if (editor.returnValue !== 'saved' && editorTrigger?.isConnected) editorTrigger.focus();
  editor.returnValue = '';
  editorTrigger = null;
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && shell.classList.contains('nav-open')) setNavigation(false);
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k' && !editor.open && !detail.open && !setEditor.open) {
    event.preventDefault();
    setNavigation(false, false);
    openSearch();
  }
});
mobile.addEventListener('change', () => setNavigation(false, false));
window.addEventListener('hashchange', () => setRoute(true));
window.addEventListener('storage', event => {
  if (event.key === storageKey || event.key === null) {
    records = readRecords();
  }
  if (event.key === setStorageKey || event.key === null) savedSets = readSavedSets();
  if (event.key === storageKey || event.key === setStorageKey || event.key === null) {
    if (state.setId && !allSets().some(set => set.id === state.setId)) state.setId = null;
    renderPage();
  }
});
setRoute();

