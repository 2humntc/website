function roll()
{
    const ARAY = [
      'Ski-U-Mah',
      'Is that so...',
      'Ufu, ufu, ufufufufufufufu',
      'The moon tonight is reed, you shall know death!'
     ];

    document.getElementById('randomtext').innerHTML = ARAY[Math.floor(Math.random()*texts.length)];
}

roll();
