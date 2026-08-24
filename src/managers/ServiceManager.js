import services from "../data/services.json" with { type: "json" };

class ServiceManager{
    getServices(){
        return services;
    }
    getServiceById(id) {
    return services.find(service => service.id === Number(id)) || null;
    }
    addService(serviceData) {
    const requiredFields = [
        "name",
        "description",
        "duration",
        "price",
        "category",
        "available"
        ];
    const missingFields = requiredFields.filter(
    field => serviceData[field] === undefined
    ); 
    if (missingFields.length > 0) {
        throw new Error(`Faltan campos: ${missingFields.join(", ")}`);
    } 
    const newId = services.length > 0
        ? Math.max(...services.map(service => service.id)) + 1
        : 1;
        

    const newService = {
        id: newId,
        ...serviceData
    };

    services.push(newService);

    return newService;
    }

    updateService(id, updateData){
        const i = services.findIndex(
        service => service.id === Number(id)
    ) ;
        if (i === -1) {
        return null;
            }
        services[i] = {
        ...services[i],
        ...updateData,
        id: services[i].id
    };    
    return services[i];
    }

    deleteService(id){
    const i = services.findIndex(
    service => service.id === Number(id)
    );
    if (i === -1) {
    return null;
    }  
    const deletedService = services.splice(i, 1);  
    return deletedService[0];
    }

}

export default ServiceManager;
