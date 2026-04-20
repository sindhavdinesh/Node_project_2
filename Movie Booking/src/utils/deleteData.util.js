const deleteData = async (model, id) => {

    let data = await model.findOne({ _id: id, isDeleted: false });

    if (!data) return { success: false, message: "not found..." };

    data = await model.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

    return { success: true, message: "Data fully deleted...", data };
};

export default deleteData;