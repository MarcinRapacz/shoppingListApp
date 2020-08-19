export interface IAlert {
  timeoutId?: NodeJS.Timeout | null;
  message: string;
  status: string;
}
