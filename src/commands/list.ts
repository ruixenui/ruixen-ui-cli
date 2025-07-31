import chalk from 'chalk';
import ora from 'ora';
import { listComponents, getCategories } from '../utils/registry';

export async function list(): Promise<void> {
  const spinner = ora('Fetching components...').start();

  try {
    const [components, categories] = await Promise.all([
      listComponents(),
      getCategories()
    ]);

    spinner.stop();

    console.log(chalk.blue.bold('\nAvailable ruixen-ui components:\n'));

    Object.entries(categories).forEach(([categoryKey, category]) => {
      console.log(chalk.yellow.bold(`${category.name}:`));
      console.log(chalk.gray(`  ${category.description}\n`));

      const categoryComponents = components.filter(comp => comp.category === categoryKey);
      
      categoryComponents.forEach(component => {
        console.log(chalk.green(`  ${component.name.toLowerCase()}`));
        console.log(chalk.gray(`    ${component.description}`));
        
        if (component.variants && component.variants.length > 0) {
          console.log(chalk.blue(`  Variants: ${component.variants.join(', ')}`));
        }
        
        if (component.sizes && component.sizes.length > 0) {
          console.log(chalk.blue(`  Sizes: ${component.sizes.join(', ')}`));
        }
        
        console.log();
      });
    });

    console.log(chalk.blue('\nAdd a component:'));
    console.log(chalk.gray('  npx ruixen-ui add <component-name>'));
    
    console.log(chalk.blue('\nExamples:'));
    console.log(chalk.gray('  npx ruixen-ui add cta-01'));

  } catch (error) {
    spinner.fail('Failed to fetch components');
    throw error;
  }
}