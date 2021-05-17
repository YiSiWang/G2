import { isNil } from '@antv/util';
import { Callback } from '@g2/types';
import { ScaleDef } from '../scale';

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
export class Attribute {
  /**
   * attribute 的类型
   */
  public type: 'base' | 'position' | 'size';

  /**
   * 字段信息
   */
  public fields: string[];

  /**
   * 需要映射的值的范围
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

  constructor(cfg: AttributeCfg) {
    this.update(cfg);
    this.type = 'base';
  }

  /**
   * 执行映射
   *
   * @param params 需要映射的值（对应 scale 顺序的值传入）
   * @return {any[]} 映射结果
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public mapping(...params: any[]) {
    if (this.callback) {
      const ret = this.callback(...params);
      if (!isNil(ret)) {
        return [ret];
      }
    }
    return this.defaultCallback(...params);
  }

  private defaultCallback(...params: any[]): any[] {
    // 没有 params 的情况，即没有指定 fields，直接返回配置的 values 常量
    if (params.length === 0) {
      return this.value;
    }

    const results = [];
    const len = params.length;
    for (let i = 0; i < len; i += 1) {
      const targetScale = this.scales[i];
      const val = params[i];
      results.push(targetScale.map(val));
    }

    return results;
  }

  /**
   * 更新 Attribute 配置
   *
   * @param cfg attribute 配置
   */
  public update(cfg: Partial<AttributeCfg>) {
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
