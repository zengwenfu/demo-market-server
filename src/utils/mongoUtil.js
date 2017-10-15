import parseRes from './parseRes';

export function exec (query) {
  return new Promise((resolve, reject) => {
    query.exec((err, data) => {
      if (err) {
        resolve({
          err: true,
          data: parseRes.DB_ERROR(err.toString())
        });
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
        resolve({
          err: true,
          data: parseRes.DB_ERROR(err.toString())
        });
        return;
      }
      resolve(data);
    });
  });
}

export function update (modal, condition, sets) {
  return new Promise((resolve, reject) => {
    modal.update(condition, sets, (err, data) => {
      if (err) {
        resolve({
          err: true,
          data: parseRes.DB_ERROR(err.toString())
        });
        return;
      }
      resolve(data);
    });
  });
}