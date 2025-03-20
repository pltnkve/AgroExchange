import { create } from "zustand";
import GetChartData from "@/app/api/GetChartData";

const useChartStore = create((set, get) => ({
	data: {
		oilData: [],
		forecast: [],
		futuresDates: [],
		models: [],
	},
	selectedFutures: '',
	selectedModel: '',
	selectedDate: '',

	initialize: (incomingData) => set({
		data: {
			oilData: incomingData.oilData,
			forecast: incomingData.currentForecast,
			futuresDates: incomingData.currentFuturesDates,
			models: incomingData.currentModels,
		},
		selectedFutures: incomingData.currentFutures,
		selectedModel: incomingData.currentModels[0],
		selectedDate: incomingData.currentFuturesDates[0].unix,
	}),

	fetchData: async (changed) => {
		const { selectedFutures, selectedModel, selectedDate, data } = get();
		const newData = await GetChartData(changed, selectedFutures, selectedModel, selectedDate, data);
		set({ data: newData });
	},

	setSelectedFutures: (futures) => {
		set({ selectedFutures: futures });
		get().fetchData("futures");
		const { data } = get();
		set({ selectedModel: data.models[0], selectedDate: data.futuresDates[0].unix });
	},

	setSelectedModel: (model) => {
		set({ selectedModel: model });
		get().fetchData("model");
		const { data } = get();
		set({ selectedDate: data.futuresDates[0].unix });
	},

	setSelectedDate: (date) => {
		set({ selectedDate: date });
		get().fetchData("date");
	},
}));

export default useChartStore;