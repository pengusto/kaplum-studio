const rows={
 en:["Code debugger · prototype","Start code debugger","Next code statement","Continue code","Pause code","Line","Variables","Finished","Paused before this statement. Next executes it; Continue runs until paused or finished. Supports let/const, direct teaching calls and braced for/while/if. Functions, timers and expressions with property access are unsupported. Helper calls run as one statement; values are primitives only."],
 de:["Code-Debugger · Prototyp","Code-Debugger starten","Nächste Code-Anweisung","Code fortsetzen","Code pausieren","Zeile","Variablen","Fertig","Pause vor dieser Anweisung. Weiter führt sie aus; Fortsetzen läuft bis Pause oder Ende. Unterstützt let/const, direkte Lehrbefehle und for/while/if mit Klammern. Funktionen, Timer und Eigenschaftszugriffe fehlen. Helfer laufen als eine Anweisung; nur einfache Werte werden angezeigt."],
 ja:["コードデバッガー · 試作","コードデバッガーを開始","次の文","コードを続行","コードを一時停止","行","変数","完了","この文の前で停止。次へで実行。let/const、直接の描画呼び出し、波括弧付きfor/while/ifを対応。関数、タイマー、プロパティアクセスは未対応。補助関数は一つの文。単純な値のみ表示。"],
 tr:["Kod hata ayıklayıcı · prototip","Kod hata ayıklayıcıyı başlat","Sonraki kod ifadesi","Koda devam et","Kodu duraklat","Satır","Değişkenler","Bitti","Bu ifadeden önce durakladı. Sonraki çalıştırır. let/const, doğrudan çizim çağrıları ve süslü parantezli for/while/if desteklenir. İşlev, zamanlayıcı ve özellik erişimi desteklenmez. Yardımcı tek ifade olarak çalışır; yalnız basit değerler gösterilir."],
 hy:["Կոդի վրիպազերծիչ · նախատիպ","Սկսել կոդի վրիպազերծումը","Հաջորդ հրահանգը","Շարունակել կոդը","Դադարեցնել կոդը","Տող","Փոփոխականներ","Ավարտված","Դադար այս հրահանգից առաջ։ Հաջորդը կատարում է այն։ Աջակցվում են let/const, նկարման կանչերը և փակագծերով for/while/if։ Ֆունկցիաները, ժամանակաչափերն ու հատկությունների հասանելիությունը չեն աջակցվում։ Օգնականը մեկ հրահանգ է․ միայն պարզ արժեքներ։"]
};
export const debuggerCopy=Object.fromEntries(Object.entries(rows).map(([locale,values])=>[locale,Object.fromEntries(["title","start","next","continue","pause","line","variables","finished","help"].map((key,i)=>[key,values[i]]))]));

const breakpointRows={
 en:["Breakpoints","Breakpoint line","Set breakpoint","Remove breakpoint","Clear breakpoints","Paused at breakpoint","Select an executable line. Continue stops before its next checkpoint; Next executes it. Breakpoints survive Restart and clear when code changes.","Choose a line with a supported statement (maximum 100 breakpoints)."],
 de:["Haltepunkte","Zeile für Haltepunkt","Haltepunkt setzen","Haltepunkt entfernen","Haltepunkte löschen","Am Haltepunkt pausiert","Wähle eine ausführbare Zeile. Fortsetzen hält vor ihrem nächsten Schritt; Weiter führt ihn aus. Haltepunkte bleiben beim Neustart und werden bei Codeänderungen gelöscht.","Wähle eine Zeile mit unterstützter Anweisung (höchstens 100 Haltepunkte)."],
 ja:["ブレークポイント","停止する行","停止点を設定","停止点を削除","すべて削除","停止点で一時停止","実行できる行を選ぶ。続行は次のチェックポイントの前で停止。次へで実行。再起動で保持し、編集で削除。","対応する文の行を選択してください（最大100件）。"],
 tr:["Kesme noktaları","Kesme noktası satırı","Kesme noktası ekle","Kesme noktasını kaldır","Kesme noktalarını temizle","Kesme noktasında durakladı","Çalıştırılabilir bir satır seç. Devam sonraki noktadan önce durur; Sonraki çalıştırır. Yeniden başlatmada korunur, kod düzenlenince silinir.","Desteklenen bir ifadenin satırını seç (en fazla 100 nokta)."],
 hy:["Կանգառի կետեր","Կանգառի տողը","Ավելացնել կանգառ","Հեռացնել կանգառը","Ջնջել կանգառները","Դադար կանգառի կետում","Ընտրեք կատարվող տողը։ Շարունակելը կանգնում է հաջորդ կետից առաջ, Հաջորդը կատարում է այն։ Վերագործարկման դեպքում կետերը մնում են, խմբագրման դեպքում՝ ջնջվում։","Ընտրեք աջակցվող հրահանգի տողը (առավելագույնը 100 կետ)։"]
};
for(const [locale,values] of Object.entries(breakpointRows)) Object.assign(debuggerCopy[locale],Object.fromEntries(["breakpoints","breakpointLine","addBreakpoint","removeBreakpoint","clearBreakpoints","breakpointHit","breakpointHelp","breakpointError"].map((key,i)=>[key,values[i]])));

const interfaceRows={
 en:["Debug code","Next step","Continue","Pause","The highlighted statement runs when you press Next step.","Supported code"],
 de:["Code untersuchen","Nächster Schritt","Fortsetzen","Pause","Nächster Schritt führt die markierte Anweisung aus.","Unterstützter Code"],
 ja:["コードを調べる","次のステップ","続行","一時停止","次のステップで強調表示された文を実行します。","対応するコード"],
 tr:["Kodu incele","Sonraki adım","Devam","Duraklat","Sonraki adım vurgulanan ifadeyi çalıştırır.","Desteklenen kod"],
 hy:["Ուսումնասիրել կոդը","Հաջորդ քայլը","Շարունակել","Դադար","Հաջորդ քայլը կատարում է նշված հրահանգը։","Աջակցվող կոդ"]
};
for(const [locale,values] of Object.entries(interfaceRows)) Object.assign(debuggerCopy[locale],Object.fromEntries(["startShort","nextShort","continueShort","pauseShort","stepHint","limits"].map((key,i)=>[key,values[i]])));
