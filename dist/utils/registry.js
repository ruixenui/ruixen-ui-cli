"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegistry = getRegistry;
exports.getComponent = getComponent;
exports.getComponentFile = getComponentFile;
exports.listComponents = listComponents;
exports.getComponentsByCategory = getComponentsByCategory;
exports.getCategories = getCategories;
exports.getComponentWithDependencies = getComponentWithDependencies;
const REGISTRY_URL = 'https://ruixen.com/registry.json';
const COMPONENTS_BASE_URL = 'https://ruixen.com/ruixen-ui';
async function getRegistry() {
    try {
        const response = await fetch(REGISTRY_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch registry: ${response.statusText}`);
        }
        return await response.json();
    }
    catch (error) {
        throw new Error(`Failed to load registry: ${error}`);
    }
}
async function getComponent(name) {
    const registry = await getRegistry();
    const component = registry.components[name];
    if (!component) {
        throw new Error(`Component "${name}" not found`);
    }
    return component;
}
async function getComponentFile(filePath) {
    try {
        const response = await fetch(`${COMPONENTS_BASE_URL}/${filePath}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch component file: ${response.statusText}`);
        }
        return await response.text();
    }
    catch (error) {
        throw new Error(`Failed to load component file: ${error}`);
    }
}
async function listComponents() {
    const registry = await getRegistry();
    return Object.values(registry.components);
}
async function getComponentsByCategory(category) {
    const registry = await getRegistry();
    const components = Object.values(registry.components);
    if (!category) {
        return components;
    }
    return components.filter(component => component.category === category);
}
async function getCategories() {
    const registry = await getRegistry();
    return registry.categories;
}
async function getComponentWithDependencies(name, visited = new Set()) {
    // Prevent infinite loops
    if (visited.has(name)) {
        return [];
    }
    visited.add(name);
    const component = await getComponent(name);
    const result = [component];
    // Recursively get internal dependencies
    if (component.internalDependencies && component.internalDependencies.length > 0) {
        for (const depName of component.internalDependencies) {
            const depComponents = await getComponentWithDependencies(depName, visited);
            // Add dependencies at the beginning so they're installed first
            result.unshift(...depComponents);
        }
    }
    // Remove duplicates by component name (keep first occurrence)
    const uniqueComponents = [];
    const seenNames = new Set();
    for (const comp of result) {
        if (!seenNames.has(comp.name)) {
            seenNames.add(comp.name);
            uniqueComponents.push(comp);
        }
    }
    return uniqueComponents;
}
