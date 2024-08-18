import type { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';
import { BizCode } from 'shared/enum';
import { createKoaMiddleware } from 'trpc-koa-adapter';
import { t } from './api';
import apiRouter from './implement';

export const appRouter = t.mergeRouters(
  apiRouter,
  t.router({ test: t.procedure.query(() => 'hello world') }),
);
function createContext(e: CreateHTTPContextOptions) {
  return e;
}
export const routes = createKoaMiddleware({ router: appRouter, createContext });
export const output = {
  /**提供类型检查 */
  data(output: Shared.Output) {
    return output;
  },
  succ<T>(data: T) {
    return { code: BizCode.Success._value, msg: '', data };
  },
  fail(msg: string) {
    return { code: BizCode.Fail._value, msg, data: null as any };
  },
};

export type Middleware = Parameters<typeof t.procedure.use>[0];
export type AppRouter = typeof appRouter;
export type Context = ReturnType<typeof createContext>;
