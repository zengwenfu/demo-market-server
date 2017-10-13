import mongoose from 'mongoose';
import * as mongoUtil from '../../utils/mongoUtil';
const userModel = mongoose.model('Users');

// export function save (userId, data) {
//   return new Promise((resolve, reject) => {
//     userModel.findOne({
//       userId: userId
//     }).exec((err, model) => {
//       // 已经存在此 userid
//       if (model) {
//         resolve();
//       } else {
//         data.userId = userId;
//         const entity = new userModel(data);
//         entity.save((err) => {
//           if (err != null) {
//             console.log(err);
//           }
//           resolve(entity._id);
//         });
//       }
//     });
//   });
// }

export async function findUser (email, password) {
  const query = userModel.findOne({ email, password });
  const data = await mongoUtil.exec(query);
  return data;
}
