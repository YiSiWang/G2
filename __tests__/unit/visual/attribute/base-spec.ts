import { Attribute } from '@g2/visual/attribute';

describe('attribute base', () => {
  test('default options', () => {
    const attr = new Attribute({
      fields: [],
      scales: [],
      value: [],
      callback: () => {
        return ['hello world'];
      },
    });

    expect(attr.type).toStrictEqual('base');
    expect(attr.fields).toStrictEqual([]);
    expect(attr.value).toStrictEqual([]);
    expect(attr.callback).toBeDefined();
    expect(attr.scales).toStrictEqual([]);
  });

  test('test option update', () => {
    const attr = new Attribute({
      fields: [],
      scales: [],
      value: [],
      callback: () => {
        return ['hello world'];
      },
    });

    attr.update({
      fields: ['a', 'b'],
      value: [0],
      callback: undefined,
    });

    expect(attr.type).toStrictEqual('base');
    expect(attr.fields).toStrictEqual(['a', 'b']);
    expect(attr.value).toStrictEqual([0]);
    expect(attr.callback).toBeUndefined();
    expect(attr.scales).toStrictEqual([]);
  });
});
