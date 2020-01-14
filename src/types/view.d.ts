declare interface TimeCurrentViewConfig {
  format: number;
}

declare interface TimeTimerViewConfig {
  mode: string;
  status: string;
}

declare interface TimeCountDownViewConfig {
  type: string;
  value?: number;
  mode: string;
  status: string;
  valueDateTime?: number;
}
