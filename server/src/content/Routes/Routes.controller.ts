import { Body, Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';

import { IJaidRoute } from '../../models';
import { ControllerNames } from '../../constants';
import { RoutesService } from './Routes.service';

/**
 * Controller for Routes.
 */
@Controller(ControllerNames.ROUTES.toString())
export class RoutesController {

    constructor (private readonly _routesService: RoutesService) {}

    /**
     * Creates a new route.
     * @param     { IJaidRoute }   newRoute   The data for the new route.
     */
    @Post('create-route')
    async createRoute (@Body() newRoute: IJaidRoute): Promise<{ id: string }> {
        const id = await this._routesService.createRoute(newRoute);
        return { id };
    }

    /**
     * Gets a list of all routes.
     */
    @Get('get-all-routes')
    async getAllRoutes (): Promise<IJaidRoute[]> {
        const routes = await this._routesService.getAllRoutes();
        return routes;
    }

    /**
     * Gets a single route.
     * @param   { string }   routeId   The ID of the route to retrieve.
     */
    @Get('get-route/:id')
    async getRoute (@Param('id') routeId: string): Promise<IJaidRoute> {
        const route = await this._routesService.getRoute(routeId);
        return route;
    }

    /**
     * Updates the route with the given data using the given ID.
     * @param   { string }   id          The id of the route to modify.
     * @param   { string }   pageTitle   The name to use for the route.
     * @param   { string }   pagePath    The path to use for the route.
     * @param   { object }   content     The QuillJS content of the page.
     */
    @Patch('update-route/:id')
    async updateRoute (
        @Param('id') id: string,
        @Body('pageTitle') pageTitle: string,
        @Body('pagePath') pagePath: string,
        @Body('content') content: object,
    ): Promise<IJaidRoute> {
        const routeUpdated = await this._routesService.updateRoute(id, pageTitle, pagePath, content);
        return routeUpdated;
    }

    /**
     * Deletes the route with the given ID.
     * @param   { id }   id   The ID of the route to delete.
     */
    @Delete('delete-route/:id')
    async deleteRoute (@Param('id') id: string): Promise<void> {
        await this._routesService.deleteRoute(id);
    }
}
