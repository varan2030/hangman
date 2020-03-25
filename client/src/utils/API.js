import axios from "axios";

export default {
	getWord: function() {
		return axios.get("/word");
	}
};
