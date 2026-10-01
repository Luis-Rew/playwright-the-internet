import { Page, FrameLocator } from '@playwright/test';

export class NestedFramesPage {
  readonly page: Page;
  readonly topFrame: FrameLocator;
  readonly bottomFrame: FrameLocator;

  constructor(page: Page) {
    this.page = page;
    this.topFrame = page.frameLocator('frame[name="frame-top"]');
    this.bottomFrame = page.frameLocator('frame[name="frame-bottom"]');
  }

  async goto() {
    await this.page.goto('/nested_frames');
  }

  leftFrameText() {
    return this.topFrame.frameLocator('frame[name="frame-left"]').locator('body');
  }

  middleFrameText() {
    return this.topFrame.frameLocator('frame[name="frame-middle"]').locator('#content');
  }

  rightFrameText() {
    return this.topFrame.frameLocator('frame[name="frame-right"]').locator('body');
  }

  bottomFrameText() {
    return this.bottomFrame.locator('body');
  }
}
