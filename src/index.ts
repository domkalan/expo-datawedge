import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoDatawedge.web.ts
// and on native platforms to ExpoDatawedge.ts
import ExpoDatawedgeModule from './module';

export type ScanPayload = {
  data: string;
  labelType: string;
  source: string;
};

export function startListening(): string {
  return ExpoDatawedgeModule.startListening();
}

export function stopListening(): string {
  return ExpoDatawedgeModule.stopListening();
}

const emitter = new EventEmitter(ExpoDatawedgeModule ?? NativeModulesProxy.ExpoDatawedge);

export function addScanListener(listener: (event: ScanPayload) => void): Subscription {
  return emitter.addListener<ScanPayload>('onScanReceived', listener);
}

export function removeScanListener(subscriptionId: Subscription): void {
  emitter.removeSubscription(subscriptionId);
}
