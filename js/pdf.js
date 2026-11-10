/*
  A very small PDF writer (text, lines and boxes, built-in Helvetica).
  It exists so the summary can be made on the device with no library and no network.
  Usage: var d = HTH.pdf.create(); d.h1('Title'); d.p('Text'); var bytes = d.bytes(footerFn);
*/
(function () {
  'use strict';
  var HTH = window.HTH = window.HTH || {};

  /* Helvetica advance widths for characters 32 to 126 (per 1000 units). */
  var W = [278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278,
    556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584, 584, 556,
    1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833, 722, 778,
    667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556,
    333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556,
    556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334, 260, 334, 584];

  /* Unicode punctuation that has a slot in WinAnsi encoding. */
  var MAP = { 0x2018: 0x91, 0x2019: 0x92, 0x201C: 0x93, 0x201D: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97, 0x2026: 0x85, 0x20AC: 0x80 };

  function enc(s) {
    var out = '';
    Array.from(String(s == null ? '' : s)).forEach(function (ch) {
      var c = ch.codePointAt(0);
      if (MAP[c]) c = MAP[c];
      else if (c === 9) c = 32;
      else if (c > 255 || c < 32) c = 63;
      out += String.fromCharCode(c);
    });
    return out;
  }
  function esc(s) { return enc(s).replace(/[\\()]/g, '\\$&'); }
  function width(s, size, bold) {
    var e = enc(s), n = 0;
    for (var i = 0; i < e.length; i++) {
      var c = e.charCodeAt(i);
      n += (c >= 32 && c <= 126) ? W[c - 32] : 600;
    }
    return n * size / 1000 * (bold ? 1.08 : 1);
  }
  function wrap(s, maxW, size, bold) {
    var out = [];
    String(s == null ? '' : s).split(/\r?\n/).forEach(function (par) {
      var line = '';
      par.split(/\s+/).filter(Boolean).forEach(function (w) {
        while (width(w, size, bold) > maxW) {
          var k = w.length;
          while (k > 1 && width(w.slice(0, k), size, bold) > maxW) k--;
          if (line) { out.push(line); line = ''; }
          out.push(w.slice(0, k));
          w = w.slice(k);
        }
        var attempt = line ? line + ' ' + w : w;
        if (width(attempt, size, bold) <= maxW) line = attempt;
        else { out.push(line); line = w; }
      });
      out.push(line);
    });
    return out;
  }
  function fit(s, maxW, size, bold) {
    s = String(s == null ? '' : s).replace(/\s+/g, ' ').trim();
    if (width(s, size, bold) <= maxW) return s;
    while (s.length > 1 && width(s + '...', size, bold) > maxW) s = s.slice(0, -1);
    return s.trim() + '...';
  }
  function n2(n) { return (Math.round(n * 100) / 100).toString(); }
  function col(c) { return (c || [0, 0, 0]).map(n2).join(' '); }

  function create() {
    var PW = 612, PH = 792, M = 54, CW = PW - 2 * M;
    var pages = [[]], y = PH - M;
    var INK = [0.09, 0.14, 0.17], BRAND = [0.05, 0.35, 0.38], GRAY = [0.36, 0.4, 0.43];

    function cur() { return pages[pages.length - 1]; }
    function newPage() { pages.push([]); y = PH - M; }
    function ensure(h) { if (y - h < M + 22) newPage(); }

    function textAt(x, yy, s, o) {
      o = o || {};
      cur().push('BT /' + (o.bold ? 'F2' : 'F1') + ' ' + n2(o.size || 10) + ' Tf ' + col(o.color || INK) +
        ' rg ' + n2(x) + ' ' + n2(yy) + ' Td (' + esc(s) + ') Tj ET');
    }
    function rect(x, yy, w, h, o) {
      o = o || {};
      var stroke = o.stroke !== false;
      cur().push('q ' + (o.fill ? col(o.fill) + ' rg ' : '') +
        (stroke ? col(o.stroke || INK) + ' RG ' + n2(o.lineWidth || 0.75) + ' w ' + (o.dash ? '[3 3] 0 d ' : '') : '') +
        [x, yy, w, h].map(n2).join(' ') + ' re ' + (o.fill ? (stroke ? 'B' : 'f') : 'S') + ' Q');
    }
    function line(x1, y1, x2, y2, o) {
      o = o || {};
      cur().push('q ' + col(o.color || [0.8, 0.8, 0.8]) + ' RG ' + n2(o.lineWidth || 0.5) + ' w ' +
        (o.dash ? '[3 3] 0 d ' : '') + n2(x1) + ' ' + n2(y1) + ' m ' + n2(x2) + ' ' + n2(y2) + ' l S Q');
    }

    /* Flowing paragraph. */
    function p(s, o) {
      o = o || {};
      var size = o.size || 10, lh = size * 1.42, indent = o.indent || 0;
      wrap(s, CW - indent, size, o.bold).forEach(function (ln) {
        ensure(lh);
        textAt(M + indent, y - size, ln, o);
        y -= lh;
      });
      y -= (o.after == null ? 3 : o.after);
    }
    function h1(s) { p(s, { size: 18, bold: true, color: BRAND, after: 2 }); }
    function h2(s) {
      ensure(60);
      y -= 10;
      p(s, { size: 12.5, bold: true, color: BRAND, after: 1 });
      line(M, y, PW - M, y, { color: BRAND, lineWidth: 0.8 });
      y -= 7;
    }
    /* Label on the left, wrapped value on the right. */
    function kv(label, value, o) {
      o = o || {};
      var size = 10, lh = size * 1.42, LW = 150;
      var lab = wrap(label, LW - 8, size, true), val = wrap(value, CW - LW, size, o.bold);
      var n = Math.max(lab.length, val.length);
      for (var i = 0; i < n; i++) {
        ensure(lh);
        if (lab[i]) textAt(M, y - size, lab[i], { size: size, bold: true });
        if (val[i]) textAt(M + LW, y - size, val[i], { size: size, bold: o.bold, color: o.color });
        y -= lh;
      }
      y -= 3;
    }
    /* Grey box with small text. */
    function note(s) {
      var size = 9, lh = size * 1.4, lines = wrap(s, CW - 20, size), h = lines.length * lh + 14;
      ensure(h + 6);
      rect(M, y - h, CW, h, { fill: [0.94, 0.95, 0.95], stroke: false });
      var yy = y - 8;
      lines.forEach(function (ln) { textAt(M + 10, yy - size, ln, { size: size, color: GRAY }); yy -= lh; });
      y -= h + 8;
    }
    function gap(n) { y -= n; }

    function bytes(footerFn) {
      var total = pages.length, objs = [], i;
      pages.forEach(function (pg, idx) {
        if (footerFn) {
          pg.push('BT /F1 7.5 Tf ' + col(GRAY) + ' rg ' + M + ' 34 Td (' + esc(footerFn(idx + 1, total)) + ') Tj ET');
        }
      });
      var kids = pages.map(function (_, idx) { return (5 + idx * 2) + ' 0 R'; }).join(' ');
      objs[1] = '<< /Type /Catalog /Pages 2 0 R >>';
      objs[2] = '<< /Type /Pages /Kids [' + kids + '] /Count ' + total + ' >>';
      objs[3] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>';
      objs[4] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>';
      pages.forEach(function (pg, idx) {
        var stream = pg.join('\n');
        objs[5 + idx * 2] = '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' + PW + ' ' + PH + '] ' +
          '/Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ' + (6 + idx * 2) + ' 0 R >>';
        objs[6 + idx * 2] = '<< /Length ' + stream.length + ' >>\nstream\n' + stream + '\nendstream';
      });
      var out = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n', offsets = [];
      for (i = 1; i < objs.length; i++) {
        offsets[i] = out.length;
        out += i + ' 0 obj\n' + objs[i] + '\nendobj\n';
      }
      var xref = out.length;
      out += 'xref\n0 ' + objs.length + '\n0000000000 65535 f \n';
      for (i = 1; i < objs.length; i++) out += ('0000000000' + offsets[i]).slice(-10) + ' 00000 n \n';
      out += 'trailer\n<< /Size ' + objs.length + ' /Root 1 0 R >>\nstartxref\n' + xref + '\n%%EOF\n';
      var u8 = new Uint8Array(out.length);
      for (i = 0; i < out.length; i++) u8[i] = out.charCodeAt(i) & 255;
      return u8;
    }

    return {
      M: M, PW: PW, PH: PH, CW: CW, INK: INK, BRAND: BRAND, GRAY: GRAY,
      h1: h1, h2: h2, p: p, kv: kv, note: note, gap: gap,
      textAt: textAt, rect: rect, line: line, newPage: newPage, ensure: ensure,
      getY: function () { return y; }, setY: function (v) { y = v; },
      bytes: bytes
    };
  }

  HTH.pdf = { create: create, wrap: wrap, fit: fit, width: width };
})();
