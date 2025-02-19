import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackerTypeDto } from './create-tracker-type.dto';

export class UpdateTrackerTypeDto extends PartialType(CreateTrackerTypeDto) {}
