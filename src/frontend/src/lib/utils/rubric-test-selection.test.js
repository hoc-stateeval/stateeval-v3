
import { createHighlightedDescriptorHtml } from './rubricTextSelection';

test('complete overlap: select1: select all, select2: all', ()=> {
  const descriptor =   "<p>paragraph1</p><p>paragraph2</p><p>paragraph3</p>";
  const selections = [
    {
      text: "<p>paragraph1</p><p>paragraph2</p><p>paragraph3</p>",
      code: 1
    },
    {
      text:"<p>paragraph1</p><p>paragraph2</p><p>paragraph3</p>",
      code: 2
    }
  ];
  const highlighted = `<p><span class='merged'>paragraph1</span></p><p><span class='merged'>paragraph2</span></p><p><span class='merged'>paragraph3</span></p>`;

  const result = createHighlightedDescriptorHtml(descriptor, selections);
  expect(result).toEqual(highlighted);
})

test('no overlap: selected1: all p1, selected2: all p2', ()=> {
  const descriptor = "<p>paragraph1</p><p>paragraph2</p><p>paragraph3</p>";
  const selections = [
    {
      text: "<p>paragraph1</p>",
      code: 1
    },
    {
      text: "<p>paragraph2</p>",
      code: 2
    }
  ];
  const highlighted = `<p><span class='primary'>paragraph1</span></p><p><span class='secondary'>paragraph2</span></p><p>paragraph3</p>`;

  const result = createHighlightedDescriptorHtml(descriptor, selections);
  expect(result).toEqual(highlighted);
})

test('partial overlap: selected1: p1 => mid p2, selected2: p2 => p3', ()=> {
  const descriptor =  "<p>paragraph1</p><p>paragraph2</p><p>paragraph3</p>";
  const selections = [
    { 
      text: "<p>graph1</p><p>para</p>",
      code: 1
    },
    { 
      text: "<p>paragraph2</p><p>paragraph3</p>",
      code: 2
    },
  ];
  const highlighted = `<p>para<span class='primary'>graph1</span></p><p><span class='merged'>para</span><span class='secondary'>graph2</span></p><p><span class='secondary'>paragraph3</span></p>`;
  
  const result = createHighlightedDescriptorHtml(descriptor, selections);
  expect(result).toEqual(highlighted);
})

test('partial overlap: selected1: p1 => mid p2, selected2: p2 => mid p3', ()=> {
  const descriptor =  "<p>paragraph1</p><p>paragraph2</p><p>paragraph3</p>";
  const selections = [
    {
      text: "<p>graph1</p><p>para</p>",
      code: 1,
    },
    {
      text: "<p>paragraph2</p><p>para</p>",
      code: 2
    }
  ];
  const highlighted = `<p>para<span class='primary'>graph1</span></p><p><span class='merged'>para</span><span class='secondary'>graph2</span></p><p><span class='secondary'>para</span>graph3</p>`;
  
  const result = createHighlightedDescriptorHtml(descriptor, selections);
  expect(result).toEqual(highlighted);
})