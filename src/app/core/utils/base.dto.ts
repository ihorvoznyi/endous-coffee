export class BaseDto {
  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }

  public static from<T>(this: new (partial: any) => T, partial: any): T {
    return partial ? new this(partial) : new this({});
  }
}
