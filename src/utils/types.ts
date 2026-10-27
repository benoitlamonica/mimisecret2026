export type ReplaceSpaces<Value extends string> = Value extends `${infer Start} ${infer End}`
  ? End extends ` ${infer Rest}`
    ? ReplaceSpaces<`${Start} ${Rest}`>
    : `${Start}-${ReplaceSpaces<End>}`
  : Value