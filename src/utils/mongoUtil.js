export function exec (query) {
  return new Promise((resolve, reject) => {
    query.exec((err, data) => {
      if (err) {
        console.log(err);
        resolve(err);
        return;
      }
      resolve(data);
    });
  });
}

export function save (entity) {
  return new Promise((resolve, reject) => {
    entity.save((err, data) => {
      if (err) {
        console.log(err);
        resolve(err);
        return ;
      }
      resolve(data);
    });
  });
}