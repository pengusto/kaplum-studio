// Exercise CodeMirror's paste handler. Firefox insertText/fill can empty a
// contenteditable without inserting text; typing also adds auto-closing braces.
export async function pasteCode(page,source) {
 const editor=page.locator('#code');
 await editor.click();await page.keyboard.press('ControlOrMeta+A');
 await editor.evaluate((element,text)=>{
  const event=new Event('paste',{bubbles:true,cancelable:true});
  Object.defineProperty(event,'clipboardData',{value:{getData:type=>type==='text/plain' ? text : ''}});
  element.dispatchEvent(event);
 },source);
}
