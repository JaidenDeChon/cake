import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RouteRecordRaw } from 'vue-router';

import { IJaidRoute } from '../../models';
import { JaidModuleNames } from '../../constants';

/**
 * Creates injectable server dependency RoutesService.
 */
@Injectable()
export class RoutesService {

    constructor (
        // Injects the Routes Mongoose module for use in this service.
        @InjectModel(JaidModuleNames.ROUTES)
        private readonly jaidRoutesModel: Model<IJaidRoute>
    ) {}

    /**
     * Inserts a JaidRoute into the database.
     * @param   { IJaidRoute }   newRoute The new IJaidRoute object to insert into the database.
     */
    async createRoute (newRoute: IJaidRoute) {
        const pageTitle = newRoute.pageTitle;
        const content = newRoute.content;
        const vueRouterObject = newRoute.vueRouterObject;

        const newJaidRoute = new this.jaidRoutesModel({ pageTitle, content, vueRouterObject});

        const result = await newJaidRoute.save();
        return result.id as string;
    }

    /**
     * Gets all routes from the database.
     */
    async getAllRoutes (): Promise<IJaidRoute[]> {
        const routes = await this.jaidRoutesModel.find().exec();
        return routes;
    }

    /**
     * Gets a single JaidRoute by id.
     * @param   { string }   id   The ID of the JaidRoute to get.
     */
    async getRoute (id: string): Promise<IJaidRoute> {
        const route = await this.jaidRoutesModel.findById(id);
        if (!route) throw new NotFoundException('Could not find JaidRoute.');
        return route;
    }

    /**
     * Updates a JaidRoute.
     * @param   { string }           _id               The ID of the JaidRoute to update.
     * @param   { string }           pageTitle         The new page title of the JaidRoute.
     * @param   { object }           content           The new content of the JaidRoute.
     * @param   { RouteRecordRaw }   vueRouterObject   The new Vue Router object for the JaidRoute.
     * @returns 
     */
    async updateRoute (
        _id: string,
        pageTitle: string,
        content: object,
        vueRouterObject: RouteRecordRaw
    ): Promise<IJaidRoute> {
        const route = await this.jaidRoutesModel.findByIdAndUpdate({ _id }, { pageTitle, content, vueRouterObject }).exec();
        if (!route) throw new NotFoundException('Could not find JaidRoute to update');
        return route;
    }

    /**
     * Deletes a JaidRoute.
     * @param   { string }   _id   The ID of the JaidRoute to delete.
     */
    async deleteRoute (_id: string): Promise<void> {
        await this.jaidRoutesModel.deleteOne({ _id }).exec();
    }
}
