'use strict';

window.mathStudioMath = (() => {
  const options = { trust: false, strict: 'error', throwOnError: true, maxSize: 20, maxExpand: 200 };

  function escapeHtml(text) {
    return text.replace(/[&<>"']/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);
  }

  function render(source) {
    const delimiters = /\\([()[\]])/g;
    const errors = [];
    const markup = [];
    let pending = null;
    let cursor = 0;
    for (const match of source.matchAll(delimiters)) {
      const symbol = match[1];
      const index = match.index;
      // Ignore the delimiter when its backslash is escaped.
      let start = index;
      while (start > 0 && source[start - 1] === '\\') start--;
      if ((index - start) % 2 !== 0) continue;
      if (pending && symbol === pending.close) {
        const tex = source.slice(pending.start + 2, index).trim();
        const display = pending.close === ']';
        const mode = display ? 'math-display' : 'math-inline';
        try {
          if (!tex) throw new Error('Enter LaTeX inside the math delimiters.');
          const html = window.katex.renderToString(tex, { ...options, displayMode: display });
          markup.push('<span class="' + mode + '"><span class="math-content">' + html + '</span></span>');
        } catch (error) {
          errors.push(error.message);
          markup.push('<span class="math-invalid">' + escapeHtml(source.slice(pending.start, index + 2)) + '</span>');
        }
        cursor = index + 2;
        pending = null;
      } else if (pending) {
        errors.push('Close the current formula before starting another.');
      } else if (symbol === '(' || symbol === '[') {
        markup.push(escapeHtml(source.slice(cursor, index)));
        pending = { start: index, close: symbol === '(' ? ')' : ']' };
        cursor = index;
      } else {
        errors.push('A math delimiter is missing its opening partner.');
      }
    }
    if (pending) errors.push('Close the formula with \\) for inline math or \\] for display math.');
    markup.push(escapeHtml(source.slice(cursor)));
    return { html: markup.join(''), error: errors[0] ?? '' };
  }

  function fit(container) {
    const items = [...container.querySelectorAll('.math-display, .math-inline, .statement-equation')];
    for (const item of items) item.firstElementChild.style.removeProperty('font-size');
    // Read the natural widths before changing the font sizes.
    const measurements = items.map(item => {
      const content = item.firstElementChild;
      const isInline = item.classList.contains('math-inline');
      const widthParent = isInline ? item.closest('.math-copy') : item;
      if (!widthParent || !item.getClientRects().length) return null;
      const style = getComputedStyle(widthParent);
      const available = widthParent.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      const natural = content.getBoundingClientRect().width;
      const normal = parseFloat(getComputedStyle(content).fontSize);
      return { item, content, available, natural, normal, min: 11 };
    });
    for (const item of measurements) {
      if (!item || !item.available) continue;
      const fitted = Math.floor(item.normal * (item.available - 2) / item.natural * 10) / 10;
      const size = Math.max(item.min, fitted);
      if (item.natural > item.available) item.content.style.fontSize = size + 'px';
      const needsScroll = item.natural > item.available && fitted < item.min;
      item.item.classList.toggle('math-scroll', needsScroll);
      if (needsScroll) {
        item.item.tabIndex = 0;
      } else {
        item.item.removeAttribute('tabindex');
      }
    }
  }

  return { render, fit };
})();
