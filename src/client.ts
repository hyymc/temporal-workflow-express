import { Connection, Client } from '@temporalio/client';
// import cuid from 'cuid';
import * as Workflows from './types/workflow-commands';
import { openAccount as openAccountWorkflow } from './workflows';

export async function openAccountUseCase(openAccountParams: Workflows.OpenAccount) {
  const connection = await Connection.connect();
  const client = new Client({
    connection,
    namespace: "default" // In production you will likely specify `namespace` here; it is 'default' if omitted
  });

  // Here is how we start our workflow
  const handle = await client.workflow.start(openAccountWorkflow, {
    taskQueue: 'saga-demo',
    workflowId: 'saga-' + openAccountParams.accountId,
    args: [openAccountParams],
  });
  await handle.result();
}

// run().catch((err) => {
//   console.error('account failed to open', err);
//   process.exit(1);
// });
