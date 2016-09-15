import Controller from "../../src/controller";
import {modules, params} from "./controller_base";

describe('Order Controller', function() {
  let controller = Controller({modules: modules});
  let controllerAction = controller['main'];
  controllerAction(params);

  it('just blank test', ()=> {
    expect(true).to.be.true;
  })
});
