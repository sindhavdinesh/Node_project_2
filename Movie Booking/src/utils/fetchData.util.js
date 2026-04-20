const fetchData = async (model, screenField, req) => {

    const { search, sortBy, sortOrder = "asc", page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    let query = {
        isDeleted: false
    };

    if (search) {
        if (Array.isArray(screenField) && screenField.length > 0) {
            query.$or = screenField.map(field => ({
                [field]: { $regex: search, $options: "i" }
            }));
        } else if (typeof screenField === "string") {
            query[screenField] = { $regex: search, $options: "i" };
        }
    }

    if (req.query.startTime) query.startTime = { $gte: new Date(req.query.startTime) };

    if (req.query.endTime) query.endTime = { $lte: new Date(req.query.endTime) };

    let data = {};
    let sorting = {};

    if (sortBy) {
        sorting = {
            [sortBy]: sortOrder == 'asc' ? 1 : -1
        }
        data = await model.find(query).sort(sorting).skip(skip).limit(Number(limit));

    } else data = await model.find(query).skip(skip).limit(Number(limit));


    return data;
};

export default fetchData;