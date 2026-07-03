import { HiStar } from "react-icons/hi2";
import { BsFillFuelPumpDieselFill, BsBatteryCharging } from "react-icons/bs";
import { GiGasPump } from "react-icons/gi";
import { IconType } from "react-icons";
import { IoCarSharp } from "react-icons/io5";
import { CiMap } from "react-icons/ci";
import { FaCarBattery } from "react-icons/fa";
import { TbBus, TbRvTruck } from "react-icons/tb";
import {
  TbManualGearboxFilled,
  TbAutomaticGearboxFilled,
} from "react-icons/tb";
import { GoContainer } from "react-icons/go";

export const iconMap: Record<string, IconType> = {
  alcove: IoCarSharp,
  panel_van: GoContainer,
  integrated: TbBus,
  semi_integrated: TbRvTruck,

  petrol: GiGasPump,
  diesel: BsFillFuelPumpDieselFill,
  hybrid: FaCarBattery,
  electric: BsBatteryCharging,

  automatic: TbAutomaticGearboxFilled,
  manual: TbManualGearboxFilled,

  star: HiStar,
  starDefault: HiStar,
  map: CiMap,
};
