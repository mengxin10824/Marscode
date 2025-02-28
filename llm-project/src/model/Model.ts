import { generateUUID } from "./UUID";
/**
 * 模型 ModelSwitch 中每个模型
 * 
 * @param id 唯一标识
 * @param name 模型名称
 * @param url 模型地址
 * @param apiKey 模型API密钥
 * 
 */
export class Model {
    id: string;

    name: string;
    
    /**
     * 模型图片地址，在对话框显示 Icon
     */
    img: string;

    url: string;
    /**
     * 模型API密钥，没有 Bearer 的字符串
     */
    apiKey: string;

    constructor(id: string = generateUUID(), name: string, img: string, url: string, apiKey: string) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.url = url;
        this.apiKey = apiKey;
    }

    getFullKey(): string {
        return "Bearer " + this.apiKey;
    }
}


