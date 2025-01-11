const db = uniCloud.database();
const dbCmd = db.command;
const dbPostName = 'feitui-post';
const reg=/<img\s*src=\"([^\"]*?)\"[^>]*>/gi;
const regexExcerpt = /(<([^>]+)>)/ig;

exports.main = async (event, context) => {
    const {
        action,
        formData,
        formDataId
    } = event;

    let images = [];
    formData.content.replace(reg, (match, capture)=>{
        images.push(capture);
    });
    formData.images = images;
    
    if ( formData.excerpt === '' && formData.content) {
        formData.excerpt = formData.content.replace(regexExcerpt, "").substr(0, 100);
    }
    
    let result;

    switch (action) {
        case 'update':
            formData.last_modify_date = new Date().getTime();
            formData.last_modify_ip = context.CLIENTIP;
            result = await db.collection(dbPostName).doc(formDataId).update(formData)
            return result;
            break;
        case 'add':        
            formData.publish_date = new Date().getTime();
            result = db.collection(dbPostName).add(formData);
            return result;
            break;
    }
}
