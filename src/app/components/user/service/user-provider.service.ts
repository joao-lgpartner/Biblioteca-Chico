import { UserService } from "./user.service";
import { MockUserService } from "./mock-user.service";
import { AbstractUserService } from "./abstract-user.service";
import { environment } from "../../../../../environments/environments";
import { Provider } from "@angular/core";

export const userServiceProvider: Provider = {
  provide: AbstractUserService,
  useClass: environment.useMockService ? MockUserService : UserService
}