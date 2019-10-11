const path = require("path");

const ROOT_PATH = path.resolve(__dirname, "..");
const SRC_PATH = path.resolve(ROOT_PATH, "src");
const COMPONENTS_PATH = path.resolve(SRC_PATH, "components");
const TEMPLATES_PATH = path.resolve(__dirname);

function basePath() {
  return path.join(process.cwd(), "src");
}

function isNotEmptyValidator(name) {
  return value => (!value ? `The ${name} is required.` : true);
}

module.exports = function(plop) {
  plop.setPlopfilePath(ROOT_PATH);

  plop.setHelper("basePath", basePath);

  plop.setGenerator("component-ts", {
    description: "React TS Component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name:",
        validate: isNotEmptyValidator("name")
      },
      {
        type: "directory",
        name: "selectedDir",
        message: "Where you like to create this component?",
        basePath: basePath()
      },
      {
        type: "list",
        name: "componentType",
        message: "Which type of component do you want to generate?",
        choices: ["Functional", "Class"],
        default: 0
      },
      {
        type: "list",
        name: "ownsDirectory",
        message: "Do you want to create its own directory?",
        choices: [{ name: "Yes", value: true }, { name: "No", value: false }],
        default: 1
      },
      {
        type: "list",
        name: "includeStyles",
        message: "Does this component have any styles?",
        choices: [{ name: "Yes", value: true }, { name: "No", value: false }],
        default: 0
      }
    ],
    actions(data) {
      const { componentType, ownsDirectory } = data;

      const componentDirectory = `${COMPONENTS_PATH}/{{ selectedDir }}/${
        ownsDirectory ? "{{ pascalCase name }}" : ""
      }`;

      const actions = [];

      if (ownsDirectory) {
        actions.push({
          type: "add",
          base: "component",
          templateFile: `${TEMPLATES_PATH}/component/index.tsx.hbs`,
          path: `${componentDirectory}/index.tsx`
        });
      }

      const componentTypeTemplateFile =
        componentType === "Class"
          ? `${TEMPLATES_PATH}/component/ClassComponent.tsx.hbs`
          : `${TEMPLATES_PATH}/component/FunctionalComponent.tsx.hbs`;

      actions.push({
        type: "add",
        base: "component",
        templateFile: componentTypeTemplateFile,
        path: `${componentDirectory}/{{ pascalCase name }}.tsx`
      });

      return actions;
    }
  });
};
