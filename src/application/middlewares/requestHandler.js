const requestHandler = (req, res, next) => {
	let { page, size, skip } = req.query;
	page = Number(page) || 1;
	size = Number(size) || 10;
	skip = size * page - size;

	req.query = { ...req.query, page, size, skip };
	next();
};

export default requestHandler;
