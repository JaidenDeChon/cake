import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IBlogPost } from '../../models';
import { JaidModuleNames } from 'src/constants';

/**
 * Creates injectable server dependency RoutesService.
 */
@Injectable()
export class RoutesService { }
