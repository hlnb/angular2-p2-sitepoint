"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var weather_service_1 = require('../service/weather.service');
var weather_1 = require('../model/weather');
var constants_1 = require('../constants/constants');
var WeatherComponent = (function () {
    function WeatherComponent(service) {
        var _this = this;
        this.service = service;
        this.weatherData = new weather_1.Weather(null, null, null, null, null);
        this.currentSpeedUnit = "kph";
        this.currentTempUnit = "fahrenheit";
        this.currentLocation = "";
        this.icons = new Skycons();
        this.dataReceived = false;
        this.service.getCurrentLocation()
            .subscribe(function (position) {
            _this.pos = position;
            _this.service.getCurrentWeather(_this.pos.coords.latitude, _this.pos.coords.longitude)
                .subscribe(function (weather) { return console.log(weather); }, function (err) { return console.error(err); });
        }, function (err) { return console.error(err); });
    }
    WeatherComponent.prototype.ngOnInit = function () {
        this.getCurrentLocation();
    };
    WeatherComponent.prototype.getCurrentLocation = function () {
        var _this = this;
        this.service.getCurrentLocation()
            .subscribe(function (position) {
            _this.pos = position;
            _this.getCurrentWeather();
            _this.getLocationName();
        }, function (err) { return console.error(err); });
    };
    WeatherComponent.prototype.getCurrentWeather = function () {
        var _this = this;
        this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(function (weather) {
            _this.weatherData.temp = weather["currently"]["temperature"],
                _this.weatherData.summary = weather["currently"]["summary"];
            _this.weatherData.wind = weather["currently"]["windSpeed"],
                _this.weatherData.humidity = weather["currently"]["humidity"],
                _this.weatherData.icon = weather["currently"]["icon"];
            console.log("weather: ", _this.weatherData);
            _this.setIcon();
            _this.dataReceived = true;
        }, function (err) { return console.error(err); });
    };
    WeatherComponent.prototype.getLocationName = function () {
        var _this = this;
        this.service.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(function (location) {
            console.log(location); //TODO remove
            _this.currentLocation = location["results"][4]["formatted_address"];
            console.log("Name: ", _this.currentLocation); //TODO remove
        });
    };
    WeatherComponent.prototype.toggleUnits = function () {
        this.toggleTempUnits();
        this.toggleSpeedUnits();
    };
    WeatherComponent.prototype.toggleTempUnits = function () {
        if (this.currentTempUnit == "fahrenheit") {
            this.currentTempUnit = 'celsius';
        }
        else {
            this.currentTempUnit = 'fahrenheit';
        }
    };
    WeatherComponent.prototype.toggleSpeedUnits = function () {
        if (this.currentSpeedUnit == "kph") {
            this.currentSpeedUnit = 'mph';
        }
        else {
            this.currentSpeedUnit = 'kph';
        }
    };
    WeatherComponent.prototype.setIcon = function () {
        this.icons.add("icon", this.weatherData.icon);
        this.icons.play();
    };
    WeatherComponent.prototype.setStyles = function () {
        if (this.weatherData.icon) {
            this.icons.color;
            constants_1.WEATHER_COLOURS[this.weatherData.icon]['color'];
            return constants_1.WEATHER_COLOURS[this.weatherData.icon];
        }
        else {
            this.icons.color;
            constants_1.WEATHER_COLOURS["default"]['color'];
            return constants_1.WEATHER_COLOURS["default"];
        }
    };
    WeatherComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'weather-widget',
            templateUrl: 'weather.component.html',
            styleUrls: ['weather.component.css'],
            providers: [weather_service_1.WeatherService]
        }), 
        __metadata('design:paramtypes', [weather_service_1.WeatherService])
    ], WeatherComponent);
    return WeatherComponent;
}());
exports.WeatherComponent = WeatherComponent;
//# sourceMappingURL=weather.component.js.map