function triggerLifecycleHook(instance, hookName, args) {
  // Checking for undefined as a style choice came from
  // https://emberjs.github.io/rfcs/0373-Element-Modifier-Managers.html
  if (instance[hookName] !== undefined) {
    return instance[hookName](args.positional, args.named);
  }
}

export default class ModifierManager {
  constructor(owner) {
    this.owner = owner;
  }

  createModifier(Klass, args) {
    return Klass.create(this.owner.ownerInjection(), args.named);
  }

  installModifier(instance, element, args) {
    instance.element = element;
    triggerLifecycleHook(instance, 'didInsertElement', args);
    triggerLifecycleHook(instance, 'didReceiveArguments', args);
  }

  updateModifier(instance, args) {
    triggerLifecycleHook(instance, 'didReceiveArguments', args);
    triggerLifecycleHook(instance, 'didUpdateArguments', args);
  }

  destroyModifier(instance, args) {
    triggerLifecycleHook(instance, 'willDestroyElement', args);
    instance.element = null;
  }
}
