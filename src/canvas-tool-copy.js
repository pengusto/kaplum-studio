export const canvasToolCopy = {
 en: {more:"More canvas tools",state:"Full Turtle state",compare:"Compare before and after"},
 de: {more:"Weitere Canvas-Werkzeuge",state:"Vollständiger Turtle-Zustand",compare:"Vorher und nachher vergleichen"},
 ja: {more:"その他の描画ツール",state:"Turtleの詳細な状態",compare:"変更前と変更後を比較"},
 tr: {more:"Diğer çizim araçları",state:"Tam Turtle durumu",compare:"Öncesi ve sonrasını karşılaştır"},
 hy: {more:"Նկարման այլ գործիքներ",state:"Կրիայի ամբողջ վիճակը",compare:"Համեմատել առաջ և հետո"}
};

const modeCopy = {
 en:['Drawing','Animation','Interactive program','Resume','Pause animation','Timers and input run normally. Stop ends the program.','Pause holds this animation; resume continues from the same position.'],
 de:['Zeichnung','Animation','Interaktives Programm','Fortsetzen','Animation pausieren','Timer und Eingaben laufen normal. Stoppen beendet das Programm.','Pause hält die Animation an; Fortsetzen macht an derselben Position weiter.'],
 ja:['描画','アニメーション','対話型プログラム','再開','アニメーションを一時停止','タイマーと入力は通常実行します。停止で終了します。','一時停止後は同じ位置から再開します。'],
 tr:['Çizim','Animasyon','Etkileşimli program','Devam et','Animasyonu duraklat','Zamanlayıcı ve giriş normal çalışır. Durdur programı bitirir.','Duraklat animasyonu bekletir; devam aynı konumdan sürer.'],
 hy:['Նկար','Շարժապատկեր','Ինտերակտիվ ծրագիր','Շարունակել','Դադարեցնել շարժապատկերը','Ժամանակաչափերն ու մուտքը սովորական են աշխատում։ Կանգը ավարտում է ծրագիրը։','Դադարը պահում է շարժապատկերը․ շարունակելը սկսում է նույն դիրքից։']
};
for (const [locale,values] of Object.entries(modeCopy)) Object.assign(canvasToolCopy[locale],Object.fromEntries(['drawing','animation','live','resume','pauseAnimation','liveHelp','animationHelp'].map((key,i)=>[key,values[i]])));
