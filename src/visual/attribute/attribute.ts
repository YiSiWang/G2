import { ScaleDef } from '../scale';

export type Callback = (...args: any[]) => any[];

export type AttributeCfg = {
  /**
   * 对应字段
   */
  readonly fields: string[]; // 可以直接 = scale.field 的值
  /**
   * 对应字段的 scales
   */
  readonly scales: ScaleDef[];
  /**
   * 属性映射的 value
   */
  readonly value?: any;
  /**
   * 属性映射的 function，和 value 2 选 1
   */
  readonly callback?: Callback;
};

/**
 * 所有视觉通道属性的基类
 *
 * @class Base
 */
export abstract class Attribute {
  /**
   * attribute 的类型
   */
  public type: 'base' | 'position' | 'size';

  /**
   * 字段信息
   */
  public fields: string[];

  /**
   * 映射的值范围
   */
  public value: any[] = [];

  /**
   * 属性映射的 callback 函数
   */
  public callback: Callback;

  /**
   * 属性映射对应的字段 scale
   */
  public scales: ScaleDef[];

  /**
   * 是否是 linear 线性映射
   */
  public isLinear: boolean = false;

  protected constructor(cfg: AttributeCfg) {
    this.update(cfg);
  }

  /**
   * 执行映射
   *
   * @param params 需要映射的值（对应 scale 顺序的值传入）
   * @return {any[]} 映射结果
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected mapping(...params: any[]) {
    return [];
  }

  /**
   * 更新 Attribute 配置
   *
   * @param cfg attribute 配置
   */
  public update(cfg: AttributeCfg) {
    const {
      fields = [],
      scales = [],
      value = [],
      callback,
    } = cfg;

    this.fields = fields;
    this.value = value;
    this.callback = callback;
    this.scales = scales;
  }
}
