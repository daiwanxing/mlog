import mitt from "mitt";

const eventBus = mitt();

export const MESSAGE_CONSTANTS = {
    ADD_HISTORY: "ADD_HISTORY" // 添加一条新的历史记录
}

export default eventBus;
