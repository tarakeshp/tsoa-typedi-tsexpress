import { IocContainer, IocContainerFactory } from 'tsoa';
import { Container, Inject, Service } from 'typedi';


const iocContainer: IocContainerFactory = function (
  request: Request
): IocContainer {
    Container.bind(request);
  return Container;
};

export { Container, Inject, Service, iocContainer };