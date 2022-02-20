const  getSelectedHtml = () => {
  let html = "";
  let sel = window.getSelection();
  if (sel.rangeCount) {
      var container = document.createElement("div");
      for (var i = 0, len = sel.rangeCount; i < len; ++i) {
          container.appendChild(sel.getRangeAt(i).cloneContents());
      }
      html = container.innerHTML;
  }
  return html;
}

function getStartSpan(code) {
  if (code===1) return "<span class='primary'>";
  else if (code===2) return "<span class='secondary'>";
  else if (code===3) return "<span class='merged'>";
}

function processNextCodedSection(descriptorText, codedText, start) {
  let end = start;
  while (end<codedText.length && codedText[end]===codedText[start]) end++;
  let html = descriptorText.substring(start, end);
  if (codedText[start] > 0) {
    const startSpan = getStartSpan(codedText[start]);
    html = `${startSpan}${html}</span>`;
  }
  return [end, html];
}

function updateCodedText(codedText, descriptorText, selectedText, code) {
  let startHighlightIndex = descriptorText.indexOf(selectedText);
  let endHighlightIndex = startHighlightIndex+selectedText.length;

  let i = startHighlightIndex;
  while (i<endHighlightIndex) {
    if (descriptorText.indexOf("<p>", i)===i) {
      i+=3;
    }
    else if (descriptorText.indexOf("</p>", i)===i) {
      i+=4;
    }
    else if (codedText[i]===0) {
      codedText[i] = code;
      i++;
    }
    else {
      codedText[i] = 3;
      i++;
    }
  }
}

function highlightDescriptor(codedText, descriptorText) {
  let highlightedHtml = "<p>";

  let i = 0;
  while (i<descriptorText.length) {
    const [end, html] = processNextCodedSection(descriptorText, codedText, i);
    highlightedHtml+=html;
    i = end;
  }

  highlightedHtml+="</p>";
  return highlightedHtml;
}


function removeLeadingParagraph(text) {
  // remove beginning <p>
  return text.substring(3);
}

function removeTrailingParagraph(text) {
  // remove ending </p>
  return text.substring(0, text.length-4);
}

function removeLeadingTrailingParagraphs(selectionText) {
  let selected = removeLeadingParagraph(selectionText);
  selected = removeTrailingParagraph(selected);
  return selected;
}

function createHighlightedDescriptorHtml(descriptorText, selection1Text, selection2Text) {
 
  // because getSelectedText always adds a starting <p> and ending </p>, we need to check to
  // see if the starting <p> and ending </p> contains the entire paragraph contents and if
  // not remove them prior to coding the string.

  let descriptor = removeLeadingTrailingParagraphs(descriptorText);
  let selected1 = removeLeadingTrailingParagraphs(selection1Text);
  let selected2 = removeLeadingTrailingParagraphs(selection2Text);

  let codedText = Array(descriptor.length).fill(0);

  updateCodedText(codedText, descriptor, selected1, 1);
  updateCodedText(codedText, descriptor, selected2, 2);

  return highlightDescriptor(codedText, descriptor);
}

export {
  getSelectedHtml,
  createHighlightedDescriptorHtml
}
