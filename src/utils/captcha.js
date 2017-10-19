import ccap from 'ccap';

const codes = [];
let i;
for (i = 48; i <= 57; i++) {
  codes.push(String.fromCharCode(i));
}
for (i = 65; i <= 90; i++) {
  codes.push(String.fromCharCode(i));
} 
for (i = 97; i <= 122; i++) {
  codes.push(String.fromCharCode(i));
}

const generate = function () {
  const arr = [];
  for (i = 0; i < 6; i++) {
    const index = Math.floor(Math.random() * (61 - 0 + 1) + 0);
    const char = codes[index];
    arr.push(char);
  }
  return arr.join('');
};

export default function captcha () {
  const  captcha = ccap({
    width: 160,
    height: 60,
    offset: 40,
    quality: 50,
    fontsize: 57,
    generate
  });
  const ary = captcha.get();
  const data = ary[1].toString('base64');
  return {
    data: `data:image/png;base64,${data}`,
    code: ary[0]
  };
}