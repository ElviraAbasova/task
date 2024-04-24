export const postDatas = async (url, obj) => {
    let res = await axios.post(url, obj);
    let data = res.data;
    return data;
};
export const getDatas = async (url) => {
    let res = await axios(url);
    let data = res.data;
    return data;
};

export const getDataId = async (url,id) => {
    let res = await axios(url + "/" + id);
    let data = res.data;
    return data;
};

export const deleteData = async (url,id) => {
    let res = await axios.delete(url + "/" + id);
    let data = res.data;
    return data;
};
