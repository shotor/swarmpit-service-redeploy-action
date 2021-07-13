<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

## Usage

```yaml
uses: shotor/swarmpit-service-redeploy-action
with:
  url: http://example.org
  stack: my-app
  service: web # expanded to my-app_web
  tag: 3.5
  api-key: X9dCI3
```

## License

MIT
