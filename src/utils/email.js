import nodemailer from 'nodemailer';

import parseRes from './parseRes';

/**
 * [description]
 * @param  {[type]} to      发送对象，支持单个发送 String，和多个发送 Array
 * @param  {[type]} subject 邮件标题
 * @param  {[type]} content 邮件内容 html
 * @return {[type]}         [description]
 */
export function send (to, subject, content) {
  const transporter = nodemailer.createTransport({  
    host: 'smtpdm.aliyun.com',
    port: 25,
    secureConnection: true, // use SSL
    auth: {  
      user: 'feili@facemagic888.com',  
      pass: 'FAcemagic2017'
    }  
  });


  if (to instanceof Array) {
    to = to.join(',');
  }

  const mailOptions = {
    from: 'feili@facemagic888.com', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    // text: 'Hello world?', // plain text body
    html: content // html body
  };

  return new Promise ((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        resolve({
          err: true,
          data: parseRes.EMAIL_ERROR(error.toString())
        });
        return;
      }
      resolve();
    });
  }); 
};

function buildRegisterEmail (name = '菲友', checkUrl) {
  const content = `
    <p>尊敬的 ${name}:</p>
    <p>您好，欢迎注册菲麦，点击链接完成注册验证：<a href="${checkUrl}">点此验证</a></p>
    <p></p>
    <p>链接无效？请复制黏贴下面的链接至浏览器地址栏打开：</p>
    <p>${checkUrl}</p>
  `;
  return content;
}

export async function sendRegister (to, name, checkUrl) {
  const content = buildRegisterEmail(name, checkUrl);
  return await send(to, '注册验证--菲麦', content);
};


