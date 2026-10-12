import {test,expect} from '@playwright/test';
import {parser} from '@lezer/javascript';
import {recipes,reference} from '../src/reference.js';
import {teacherExamples} from '../src/teacher-examples.js';
import {pasteCode} from './helpers/editor.js';
test('catalogue and workshop programs put separate statements on separate lines',()=>{
 const sources=[...recipes,...reference].map(item=>item.code).concat(teacherExamples.flatMap(item=>[item.starter,item.solution])).filter(Boolean);
 for(const source of sources){
  const lines=new Set();
  parser.parse(source).iterate({enter:node=>{
   expect(node.type.isError).toBe(false);
   if((node.name.endsWith('Statement')||node.name==='VariableDeclaration') && ['Script','Block'].includes(node.node.parent?.name)){
    const line=source.slice(0,node.from).split('\n').length;
    expect(lines.has(line),source).toBe(false);lines.add(line);
   }
  }});
 }
});
test('mobile Dino starter is readable and an edited draft survives navigation',async({page})=>{
 await page.setViewportSize({width:458,height:772});await page.goto('/#figure/figur-dino');
 await expect(page.locator('#code .cm-line').nth(0)).toHaveText('hideTurtle();');
 await expect(page.locator('#code .cm-line').nth(1)).toHaveText('goto(0, 0);');
 await expect(page.locator('#code .cm-line').nth(2)).toContainText('drawDino(');
 const draft='hideTurtle(); goto(7, 8); // keep my formatting';await pasteCode(page,draft);
 await page.getByRole('toolbar',{name:'Dock'}).getByRole('link',{name:'Figures',exact:true}).click();
 await page.getByRole('heading',{name:'Dinosaur',exact:true}).getByRole('link').click();
 await expect(page.locator('#code')).toHaveText(draft);
});
