const tf = require('@tensorflow/tfjs-node');

function normalized(data){ // x1 x2 x3
    x1 = (data[0] - 29.9412) / 8.936247
    x2 = (data[1] - 32.2718) / 16.08198
    x3 = (data[2] - 42.773) / 10.33017
    x3 = (data[3] - 94.8964) / 8.88777
    return [x1, x2, x3, x4]
}

function denormalized(data){
    y1 = (data[0] * 11.79956) + 69.739
    y2 = (data[1] * 10.33017) + 42.773
    y3 = (data[2] * 8.9181) + 39.959
    y4 = (data[3] * 8.936247) + 29.9412
    y5 = (data[4] * 16.08198) + 32.2718
    y6 = (data[5] *  8.887377) + 94.8964
    return [y1, y2, y3, y4, y5, y6]
}



async function predict(data){
    let in_dim = 3;
    
    data = normalized(data);
    shape = [1, in_dim];

    tf_data = tf.tensor2d(data, shape);

    try{
        // path load in public access => github
        const path = 'https://raw.githubusercontent.com/zarulrohmadhan/Perbaikan_JST_Moh_Zarul/main/public/perbaikan_JST_MohZarul_model/model.json';
        const model = await tf.loadGraphModel(path);
        
        predict = model.predict(
                tf_data
        );
        result = predict.dataSync();
        return denormalized( result );
        
    }catch(e){
      console.log(e);
    }
}

module.exports = {
    predict: predict 
}
  
