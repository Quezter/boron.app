import { Injectable } from "@angular/core";
import { DeviceType } from "tns-core-modules/ui/enums";
import { device } from "tns-core-modules/platform";

@Injectable()
export class UtilityService {
    public isValidUsername(username: String) {
        return !!username;
    }
    public isTablet() {
        return device.deviceType === DeviceType.Tablet;
    }
}
