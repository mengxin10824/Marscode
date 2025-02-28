import { getNow } from "./Time";
import { generateUUID } from "./UUID";

// Tab 类型定义
export class Tab {
    // 标识
    id: string;
    name: string;

    // 是否激活
    isActive: boolean;

    // 创建时间
    createdTime: string;

    // 更新时间
    updatedTime: string;

    // 是否无痕
    isPrivate: boolean = false;

    constructor(id: string = generateUUID(), name: string, isActive: boolean, time: string = getNow()) {
        this.id = id;
        this.name = name;
        this.isActive = isActive;
        this.createdTime = time;
        this.updatedTime = time;
    }

    
}