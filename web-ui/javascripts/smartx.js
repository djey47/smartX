// Utilities

/*
* Invokes specified function immediately, then every intervalMilliseconds.
* Returns intervalId to control it later on
*/
function invokeAndRepeat(toInvoke, intervalMilliseconds) {
    toInvoke();
    return setInterval(toInvoke, intervalMilliseconds);
}

/*
* Returns fahrenheit degrees temperature from celsius degrees.
*/
function celsiusToFahrenheit(celsiusTemp) {
    return (celsiusTemp * 1.8 + 32).toFixed(1);
}

/*
* Returns disk brand from full model information
*/
function extractBrand(diskModel) {
	var regex = "^([A-Z]+)[A-Z0-9]*$";
	var brandInitials = diskModel.match(regex)[1];
	var diskBrand = diskBrands[brandInitials];

	if(diskBrand) {
		return diskBrand;
	} else {
		return diskBrands["_"] + brandInitials;
	}
}
/*
 * Represents all known disk brands per initials
 */
var diskBrands = {
	HDS: "HGST",
	ST : "Seagate Technology",
	DT : "Toshiba",
	WD : "Western Digital",
	_  : "Unknown:"
};

/*
 * Returns CSS class to use when encountering specified status
 */
function getStatusLabelClass(status) {

	var specializedClass;

	switch (status) {

	case "OK" :
		specializedClass = "label-success";
		break;

	case "KO" :
		specializedClass = "label-danger";
		break;

	case "WARN" :
		specializedClass = "label-warning";
		break;

	default:
		specializedClass = "label-default";
	}

	return "label " + specializedClass;
}

/*
 * Returns status label to use when encountering specified status
 */
function getStatusLabel(status) {

	switch(status) {

	case "UNAVAIL" :
		return "?";

	default :
		return status;
	}
}

/*
 * Provides normalized temperature from disk_id
 */
function getTemperatureNormalized(diskId) {

	var disk = diskListViewModel.disks()[diskId-1];
	// To handle case of empty disk list in model (when refreshing).
	if (!disk) {
		return '';
	}

	// Item #8 is temperature according to ESXI... guaranteed ?
	return disk.smart.items[8].value;
}

/*
 * Provides temperature in Celsius degrees from disk_id
 */
function getTemperatureCelsius(diskId) {

	var disk = diskListViewModel.disks()[diskId-1];
	// To handle case of empty disk list in model (when refreshing).
	if (!disk) {
		return '';
	}

	var tempValue = getTemperatureNormalized(diskId);
	var brand = extractBrand(disk.model);

	// WESTERN DIGITAL: 40C <=> 107N
	if (brand == diskBrands["WD"]) {
		tempValue = (tempValue * 40 / 107).toFixed(1);
	}

	return tempValue;
}

/*
 * Provides temperature in Fahrenheit degrees from disk_id
 */
function getTemperatureFahrenheit(diskId) {
	var tempCelsius = getTemperatureCelsius(diskId);

	return celsiusToFahrenheit(tempCelsius);
}